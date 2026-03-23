import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { data: emailData, error } = await resend.emails.send({
      from: "Rosimo_OS <onboarding@resend.dev>",
      to: ["gsinuiri@gmail.com"], // Reemplaza con tu correo
      subject: `🚨 LEAD: ${data.vehiculo} - ${data.nombre}`,
      html: `
        <div style="font-family: sans-serif; background: #020617; color: #f8fafc; padding: 40px; border-radius: 20px;">
          <h2 style="color: #dc2626; border-bottom: 1px solid #1e293b; padding-bottom: 15px;">NUEVA EVALUACIÓN FINANCIERA</h2>
          <p><strong>Cliente:</strong> ${data.nombre}</p>
          <p><strong>DNI:</strong> ${data.dni}</p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/51${data.whatsapp}" style="color: #10b981;">${data.whatsapp}</a></p>
          
          <div style="margin-top: 25px; padding: 20px; background: #0f172a; border-radius: 12px;">
            <p><strong>Vehículo:</strong> ${data.vehiculo}</p>
            <p><strong>Cuota Inicial:</strong> S/ ${data.cuotaInicial}</p>
            <p><strong>Plazo solicitado:</strong> ${data.meses} meses</p>
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 15px 0;">
            <p><strong>Ingresos:</strong> ${data.ingresos}</p>
            <p><strong>Situación:</strong> ${data.situacion}</p>
            <p><strong>Historial:</strong> ${data.historial}</p>
          </div>
        </div>
      `,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Falla de servidor" }, { status: 500 });
  }
}
