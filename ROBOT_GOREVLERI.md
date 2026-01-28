# yisa-s.com — Robot / API Görevleri

**Domain:** yisa-s.com  
**Merkez rehber:** `C:\Users\info\YISA-S_KURULUM_DEPLOY_VE_ROBOT_GOREVLERI.md`

| Endpoint | Metod | Görevi |
|----------|-------|--------|
| `/api/robot/chat` | POST | **NeebChat** — Claude + yisas bilgi bankası, actions/suggestions |
| `/api/demo` | POST | Demo talep kaydı |
| `/api/franchise` | POST | Franchise başvuru kaydı |
| `/api/akular/durum` | GET | Akü env durumu |
| `/api/akular/kontrol` | GET | Akü sağlık kontrolü |
| `/api/sistem-durum` | GET | Sistem aktif mi? |
| `/api/panel/demo-listesi` | GET | Panel: demo listesi |
| `/api/panel/bayilik-listesi` | GET | Panel: bayilik listesi |

NeebChat: `components/robot/ChatWidget.tsx` + `lib/knowledge/yisas.ts` + `app/api/robot/chat/route.ts`
