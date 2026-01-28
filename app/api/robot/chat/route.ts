// /app/api/robot/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Anthropic from '@anthropic-ai/sdk'
import { ROBOT_SYSTEM_PROMPT } from '@/lib/knowledge/yisas'

function getAnthropic() {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  return new Anthropic({ apiKey: key })
}

interface ChatRequest {
  message: string
  session_id: string
  context?: string
  page_url?: string
  conversation_history?: Array<{ role: 'user' | 'assistant'; content: string }>
}

function parseAIResponse(text: string) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch {
    // JSON parse failed
  }
  return {
    message: text,
    actions: [
      { type: 'demo', label: '🚀 Tanıtım Talep Et', url: '/demo' },
      { type: 'link', label: '📞 İletişim', url: '/hakkimizda#iletisim' },
    ],
    suggestions: [],
  }
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body: ChatRequest = await request.json()

    if (!body.message || !body.session_id) {
      return NextResponse.json({
        success: false,
        error: 'message ve session_id zorunludur',
      }, { status: 400 })
    }

    const anthropic = getAnthropic()
    if (!anthropic) {
      return NextResponse.json({
        success: false,
        data: {
          message: 'Robot şu an yapılandırılmamış. Lütfen daha sonra tekrar deneyin.',
          actions: [{ type: 'link', label: '📞 İletişim', url: '/hakkimizda#iletisim' }],
          suggestions: [],
          session_id: body.session_id,
          ai_model: '',
        },
      }, { status: 503 })
    }

    const messages = [
      ...(body.conversation_history || []).map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: body.message },
    ]

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: ROBOT_SYSTEM_PROMPT,
      messages,
    })

    const aiContent = response.content[0]
    let parsedResponse = { message: '', actions: [], suggestions: [] }

    if (aiContent.type === 'text') {
      parsedResponse = parseAIResponse(aiContent.text)
    }

    const responseTime = Date.now() - startTime

    // Log to database — şema kolonları: kullanici_mesaji, robot_yaniti, ai_motor, token_kullanimi, yanit_suresi_ms, sayfa_url, context, onerilen_aksiyonlar
    if (supabase) {
      await supabase.from('robot_chat_logs').insert({
        session_id: body.session_id,
        kullanici_mesaji: body.message,
        robot_yaniti: parsedResponse.message || '',
        ai_motor: 'claude',
        token_kullanimi: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
        yanit_suresi_ms: responseTime,
        sayfa_url: body.page_url || null,
        context: body.context || 'website',
        onerilen_aksiyonlar: parsedResponse.actions ?? [],
      }).catch((err) => console.error('Log error:', err))
    }

    return NextResponse.json({
      success: true,
      data: {
        message: parsedResponse.message,
        actions: parsedResponse.actions,
        suggestions: parsedResponse.suggestions || [],
        session_id: body.session_id,
        ai_model: 'claude-sonnet-4',
      },
    })
  } catch (error) {
    console.error('Robot API error:', error)
    return NextResponse.json({
      success: false,
      data: {
        message: 'Şu an teknik bir sorun yaşıyoruz. Lütfen daha sonra tekrar deneyin.',
        actions: [{ type: 'link', label: '📞 İletişim', url: '/hakkimizda#iletisim' }],
        suggestions: [],
        session_id: '',
        ai_model: '',
      },
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'yisa-s-robot',
    version: '2.0.0',
  })
}
