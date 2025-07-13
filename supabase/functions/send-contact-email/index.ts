import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  company?: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "نموذج التواصل <noreply@dubaimerx.com>",
      to: ["info@dubaimerx.com"],
      subject: `رسالة جديدة من موقع DUBAIMERX: ${contactData.subject}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">رسالة جديدة من موقع DUBAIMERX</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">تفاصيل الرسالة:</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>الاسم:</strong> ${contactData.name}</p>
              ${contactData.company ? `<p style="margin: 0 0 10px 0; color: #374151;"><strong>الشركة:</strong> ${contactData.company}</p>` : ''}
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>البريد الإلكتروني:</strong> ${contactData.email}</p>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>رقم الهاتف:</strong> ${contactData.phone}</p>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>الموضوع:</strong> ${contactData.subject}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 15px 0; color: #1f2937;">الرسالة:</h3>
              <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${contactData.message}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #dbeafe; border-radius: 8px; border-right: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                هذه الرسالة تم إرسالها من نموذج التواصل في موقع DUBAIMERX.COM
              </p>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 DUBAIMERX.COM - جميع الحقوق محفوظة</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "DUBAIMERX.COM <noreply@dubaimerx.com>",
      to: [contactData.email],
      subject: "تأكيد استلام رسالتكم - DUBAIMERX.COM",
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #059669, #2563eb); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">شكراً لتواصلكم معنا</h1>
          </div>
          
          <div style="padding: 30px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">عزيزي/عزيزتي ${contactData.name}،</h2>
            
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              تم استلام رسالتكم بنجاح، وسيقوم فريقنا بالرد عليكم في أقرب وقت ممكن.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 15px 0; color: #1f2937;">ملخص رسالتكم:</h3>
              <p style="margin: 0 0 10px 0; color: #374151;"><strong>الموضوع:</strong> ${contactData.subject}</p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">تاريخ الإرسال: ${new Date().toLocaleDateString('ar-AE')}</p>
            </div>
            
            <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; border-right: 4px solid #059669; margin-bottom: 20px;">
              <p style="margin: 0; color: #047857; font-size: 14px;">
                💚 نحن ملتزمون بتقديم أفضل خدمة لعملائنا الكرام
              </p>
            </div>
            
            <p style="color: #374151; line-height: 1.6;">
              إذا كان لديكم أي استفسارات عاجلة، يمكنكم التواصل معنا عبر:
            </p>
            
            <ul style="color: #374151; line-height: 1.6;">
              <li>الهاتف: +971 4 123 4567</li>
              <li>واتساب: +971 50 123 4567</li>
              <li>البريد الإلكتروني: info@dubaimerx.com</li>
            </ul>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">© 2024 DUBAIMERX.COM - شريككم الموثوق في التجارة الإلكترونية</p>
          </div>
        </div>
      `,
    });

    console.log("Contact email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);