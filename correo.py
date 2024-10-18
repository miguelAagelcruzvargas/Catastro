import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def enviar_correo(destinatario, asunto, cuerpo):
    # Configuración del servidor SMTP de Gmail
    servidor_smtp = "smtp.gmail.com"
    puerto_smtp = 587
    usuario_smtp = "colabmodelosprueba@gmail.com"  # Tu correo de Gmail
    contrasena_smtp = "jjhj ijrl pmxd pkca"  # Contraseña de aplicación de Gmail

    # Crear el mensaje
    mensaje = MIMEMultipart()
    mensaje['From'] = usuario_smtp
    mensaje['To'] = destinatario
    mensaje['Subject'] = asunto

    # Adjuntar el cuerpo del mensaje
    mensaje.attach(MIMEText(cuerpo, 'plain'))

    try:
        # Conexión al servidor SMTP con TLS
        servidor = smtplib.SMTP(servidor_smtp, puerto_smtp)
        servidor.starttls()  # Iniciar conexión segura

        # Iniciar sesión en el servidor SMTP
        servidor.login(usuario_smtp, contrasena_smtp)

        # Enviar el correo
        texto = mensaje.as_string()
        servidor.sendmail(usuario_smtp, destinatario, texto)

        print("Correo enviado exitosamente a", destinatario)
    
    except smtplib.SMTPException as e:
        print("Error al enviar el correo:", e)
    
    except Exception as e:
        print("Error general:", e)

    finally:
        # Cerrar la conexión al servidor si está abierta
        try:
            servidor.quit()
        except NameError:
            print("No se pudo abrir la conexión al servidor SMTP.")

# Uso del script
if __name__ == "__main__":
    destinatario = "l20350265@tuxtepec.tecnm.mx"  # Correo del destinatario
    asunto = "Prueba de envío de correo"
    cuerpo = "Este es un mensaje de prueba enviado desde Python usando Gmail."

    enviar_correo(destinatario, asunto, cuerpo)
