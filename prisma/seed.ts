import { PrismaClient, TemplateCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing templates
  await prisma.template.deleteMany();

  // Invitation Templates
  await prisma.template.createMany({
    data: [
      {
        name: "Elegant Wedding Invitation",
        category: TemplateCategory.invitations,
        description: "Beautiful wedding invitation with elegant styling",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Wedding Invitation</title><style>body{font-family:'Georgia',serif;margin:0;padding:40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh}.invitation{background:white;padding:60px;text-align:center;border-radius:20px;box-shadow:0 20px 40px rgba(0,0,0,0.1);max-width:600px;margin:0 auto;border:3px solid #f8f9fa}.header{font-size:48px;color:#2c3e50;margin-bottom:20px;font-weight:300;letter-spacing:2px}.event{font-size:32px;color:#e74c3c;margin:30px 0;font-weight:bold;text-transform:uppercase}.details{font-size:18px;color:#34495e;margin:20px 0;line-height:1.6}.date-time{background:#f8f9fa;padding:20px;border-radius:10px;margin:30px 0}.venue{font-size:20px;color:#2980b9;margin:25px 0;font-weight:600}.quote{font-style:italic;color:#7f8c8d;margin:30px 0;font-size:16px;border-left:4px solid #e74c3c;padding-left:20px}</style></head><body><div class="invitation"><h1 class="header">You're Invited</h1><div class="event">{{event}}</div><div class="date-time"><div class="details"><strong>Date:</strong> {{date}}</div><div class="details"><strong>Time:</strong> {{time}}</div></div><div class="venue"><strong>Venue:</strong> {{venue}}</div><div class="quote">"{{quote}}"</div></div></body></html>`
      },
      {
        name: "Modern Party Invitation",
        category: TemplateCategory.invitations,
        description: "Contemporary party invitation with vibrant colors",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Party Invitation</title><style>body{font-family:'Arial',sans-serif;margin:0;padding:40px;background:#1a1a2e;min-height:100vh}.invitation{background:linear-gradient(45deg,#ff6b6b,#4ecdc4);padding:50px;text-align:center;border-radius:25px;max-width:650px;margin:0 auto;color:white;box-shadow:0 25px 50px rgba(0,0,0,0.3)}.header{font-size:42px;margin-bottom:25px;font-weight:bold;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}.event{font-size:36px;margin:25px 0;background:rgba(255,255,255,0.2);padding:15px;border-radius:15px;backdrop-filter:blur(10px)}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:30px 0}.info-box{background:rgba(255,255,255,0.15);padding:20px;border-radius:12px;backdrop-filter:blur(5px)}.info-label{font-size:14px;opacity:0.8;margin-bottom:5px}.info-value{font-size:18px;font-weight:bold}.venue{background:rgba(255,255,255,0.2);padding:20px;border-radius:15px;margin:25px 0;font-size:20px}.quote{font-style:italic;margin:30px 0;font-size:18px;opacity:0.9}</style></head><body><div class="invitation"><h1 class="header">Party Time!</h1><div class="event">{{event}}</div><div class="info-grid"><div class="info-box"><div class="info-label">DATE</div><div class="info-value">{{date}}</div></div><div class="info-box"><div class="info-label">TIME</div><div class="info-value">{{time}}</div></div></div><div class="venue">Location: {{venue}}</div><div class="quote">{{quote}}</div></div></body></html>`
      },

      // Communique Templates
      {
        name: "Professional Announcement",
        category: TemplateCategory.communiques,
        description: "Clean and professional communique template",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Professional Communique</title><style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;margin:0;padding:40px;background:#f5f7fa;line-height:1.6}.communique{background:white;padding:50px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.1);max-width:800px;margin:0 auto;border-top:5px solid #3498db}.header{text-align:center;margin-bottom:40px;padding-bottom:20px;border-bottom:2px solid #ecf0f1}.title{font-size:32px;color:#2c3e50;margin-bottom:10px;font-weight:600}.subtitle{color:#7f8c8d;font-size:16px}.content{margin:30px 0}.message{font-size:18px;color:#34495e;text-align:justify;margin:25px 0;padding:25px;background:#f8f9fa;border-left:4px solid #3498db;border-radius:5px}.footer{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #ecf0f1;color:#7f8c8d}</style></head><body><div class="communique"><div class="header"><h1 class="title">{{title}}</h1><p class="subtitle">Official Communique</p></div><div class="content"><div class="message">{{message}}</div></div><div class="footer"><p>Thank you for your attention</p></div></div></body></html>`
      },
      {
        name: "Corporate Newsletter",
        category: TemplateCategory.communiques,
        description: "Modern corporate newsletter design",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Corporate Newsletter</title><style>body{font-family:'Inter',sans-serif;margin:0;padding:40px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);min-height:100vh}.newsletter{background:white;border-radius:15px;overflow:hidden;max-width:700px;margin:0 auto;box-shadow:0 20px 40px rgba(0,0,0,0.15)}.header{background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:40px;text-align:center}.title{font-size:36px;margin:0;font-weight:700;letter-spacing:-0.5px}.subtitle{margin:10px 0 0 0;opacity:0.9;font-size:18px}.content{padding:40px}.message-container{background:#f8f9fa;border-radius:10px;padding:30px;border-left:5px solid #667eea}.message{font-size:16px;color:#2c3e50;line-height:1.8;margin:0}.footer{background:#2c3e50;color:white;padding:30px;text-align:center}.footer-text{margin:0;opacity:0.8}</style></head><body><div class="newsletter"><div class="header"><h1 class="title">{{title}}</h1><p class="subtitle">Corporate Update</p></div><div class="content"><div class="message-container"><p class="message">{{message}}</p></div></div><div class="footer"><p class="footer-text">Stay connected with us</p></div></div></body></html>`
      },

      // Request Templates
      {
        name: "Formal Request Letter",
        category: TemplateCategory.requests,
        description: "Professional formal request template",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Formal Request</title><style>body{font-family:'Times New Roman',serif;margin:0;padding:40px;background:#fafafa;line-height:1.8}.request{background:white;padding:60px;border-radius:8px;box-shadow:0 5px 15px rgba(0,0,0,0.08);max-width:750px;margin:0 auto;border:1px solid #e1e8ed}.letterhead{text-align:center;margin-bottom:40px;padding-bottom:20px;border-bottom:3px double #2c3e50}.title{font-size:28px;color:#2c3e50;margin-bottom:15px;font-weight:bold;text-transform:uppercase;letter-spacing:1px}.subtitle{color:#7f8c8d;font-size:16px;font-style:italic}.content{margin:40px 0}.message{font-size:16px;color:#2c3e50;text-align:justify;margin:30px 0;text-indent:30px}.signature-area{margin-top:60px;text-align:right}.signature-line{border-bottom:1px solid #2c3e50;width:200px;margin:20px 0 10px auto}.signature-text{color:#7f8c8d;font-size:14px}</style></head><body><div class="request"><div class="letterhead"><h1 class="title">{{title}}</h1><p class="subtitle">Formal Request</p></div><div class="content"><div class="message">{{message}}</div></div><div class="signature-area"><div class="signature-line"></div><p class="signature-text">Signature</p></div></div></body></html>`
      },
      {
        name: "Modern Service Request",
        category: TemplateCategory.requests,
        description: "Contemporary service request form",
        htmlContent: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Service Request</title><style>body{font-family:'Roboto',sans-serif;margin:0;padding:40px;background:linear-gradient(45deg,#f093fb 0%,#f5576c 100%);min-height:100vh}.request{background:white;padding:50px;border-radius:20px;max-width:650px;margin:0 auto;box-shadow:0 25px 50px rgba(0,0,0,0.15)}.header{background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:30px;border-radius:15px;text-align:center;margin-bottom:30px}.title{font-size:32px;margin:0;font-weight:600}.subtitle{margin:10px 0 0 0;opacity:0.9;font-size:16px}.content{margin:30px 0}.message-box{background:#f8f9fa;border-radius:12px;padding:25px;border-left:5px solid #667eea;margin:20px 0}.message{font-size:16px;color:#2c3e50;line-height:1.7;margin:0}.action-area{background:linear-gradient(135deg,#667eea,#764ba2);color:white;padding:25px;border-radius:12px;text-align:center;margin-top:30px}.action-text{margin:0;font-size:14px;opacity:0.9}</style></head><body><div class="request"><div class="header"><h1 class="title">{{title}}</h1><p class="subtitle">Service Request</p></div><div class="content"><div class="message-box"><p class="message">{{message}}</p></div></div><div class="action-area"><p class="action-text">We will process your request promptly</p></div></div></body></html>`
      }
    ]
  });

  console.log('✅ Database seeded with 6 templates successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });