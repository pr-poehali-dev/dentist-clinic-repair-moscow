import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header


def handler(event: dict, context) -> dict:
    '''Принимает заявку с сайта и отправляет её на почту владельца клиники'''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    try:
        body = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Invalid JSON'})}

    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Укажите имя и телефон'})}

    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    notify = os.environ.get('NOTIFY_EMAIL') or user

    text = (
        'Новая заявка с сайта ДЕНТАЛ РЕМОНТ\n\n'
        f'Имя: {name}\n'
        f'Телефон: {phone}\n'
        f'Сообщение: {message or "—"}\n'
    )

    msg = MIMEText(text, 'plain', 'utf-8')
    msg['Subject'] = Header('Новая заявка с сайта', 'utf-8')
    msg['From'] = user
    msg['To'] = notify

    server = smtplib.SMTP_SSL(host, 465)
    server.login(user, password)
    server.sendmail(user, [notify], msg.as_string())
    server.quit()

    return {
        'statusCode': 200,
        'headers': {**cors, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'message': 'Заявка отправлена'}),
        'isBase64Encoded': False,
    }
