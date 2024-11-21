import express from 'express';
import cors from 'cors';
import nodeMailer from 'nodemailer';

const app = express();

// Permitir que qualquer um acesse a API
app.use(cors());

// Aceitar JSON automaticamente no body
app.use(express.json());

// Rota de exemplo para envio de email
app.post('/email', (req, res) => {
    const email = req.body.email; // Email do destinatário
    const itemDigital = req.body.item; // Item digital enviado no corpo da requisição

    // Criar o link dinamicamente baseado no itemDigital
    let link = '';
    if (itemDigital === 'fotografia') {
        link = `<a href="http://seusite.com/fotografia">fotografia</a>`;
    } else {
        link = `<a href="http://seusite.com/${itemDigital}">${itemDigital}</a>`;
    }

    // Configurar o transporte do nodemailer
    const transport = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'ruanj8457@gmail.com',
            pass: 'lwxb lvkk zdhu djwv', // Use uma senha de aplicativo ou variável de ambiente
        },
    });

    // Enviar email
    transport
        .sendMail({
            from: 'ruan <ruanj8457@gmail.com>',
            to: email,
            subject: 'Enviando email de teste',
            html: `<h1>Email de teste</h1><p>Veja mais sobre o item: ${link}</p>`,
            text: 'Veja mais sobre o item.',
        })
        .then(() => {
            console.log('Email enviado com sucesso');
            res.json({ message: 'Email enviado com sucesso!' });
        })
        .catch((error) => {
            console.error('Erro ao enviar email:', error);
            res.status(500).json({ message: 'Erro ao enviar email', error });
        });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
