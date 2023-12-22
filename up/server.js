const express = require('express');
const app = express();
const { google } = require('googleapis');
const cors = require('cors');
const multer = require('multer');
const { Readable } = require('stream');
const { firestore, collection, deleteDoc, doc } = require('firebase/firestore');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());


const GOOGLE_API_FOLDER_ID = '14cPOxaLg3wqfTfTYUtowET7ftR8HYPvI';

const auth = new google.auth.GoogleAuth({
    keyFile: './googledrive.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const driveService = google.drive({
    version: 'v3',
    auth,
});

const storage = multer.memoryStorage();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const upload = multer({
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 10 MB
}).array('files', 10);

app.get('/list', async (req, res) => {
    console.log('Endpoint GET /list acionado');

    try {
        const response = await driveService.files.list({
            q: `'${GOOGLE_API_FOLDER_ID}' in parents`,
            fields: 'files(id, name)',
        });

        const files = response.data.files;

        console.log('Lista de arquivos no Google Drive:', files);

        res.json({ files });
    } catch (listError) {
        console.error('Erro ao listar arquivos do Google Drive:', listError);
        res.status(500).send('Erro ao listar arquivos do Google Drive: ' + listError.message);
    }
});

app.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Erro no upload dos arquivos:', err);
            return res.status(500).send('Erro no upload dos arquivos: ' + err.message);
        }

        try {
            if (!req.files || req.files.length === 0) {
                console.log('Nenhum arquivo foi enviado.');
                return res.status(400).send('Nenhum arquivo foi enviado.');
            }

            const fileDataArray = req.files;

            console.log('Detalhes dos arquivos recebidos:');
            console.log(fileDataArray);

            const filePromises = fileDataArray.map(async (fileData) => {
                const fileStream = Readable.from(fileData.buffer);

                console.log('Detalhes do arquivo recebido:');
                console.log(fileData);

                const fileMetaData = {
                    name: fileData.originalname,
                    parents: [GOOGLE_API_FOLDER_ID],
                };

                const media = {
                    mimeType: fileData.mimetype,
                    body: fileStream,
                };

                try {
                    const response = await driveService.files.create({
                        resource: fileMetaData,
                        media: media,
                        fields: 'id',
                    });

                    return { id: response.data.id };
                } catch (uploadError) {
                    console.error('Erro no upload do arquivo para o Google Drive:', uploadError);
                    throw uploadError;
                }
            });

            const uploadedFiles = await Promise.all(filePromises);

            console.log('Resposta do Google Drive para todos os arquivos:');
            console.log(uploadedFiles);

            res.json(uploadedFiles);
        } catch (err) {
            console.error('Erro no upload dos arquivos:', err);
            res.status(500).send('Erro no upload dos arquivos para o Google Drive: ' + err.message);
        }
    });
});

app.delete('/api/delete-google-drive-file', async (req, res) => {
    console.log('Endpoint DELETE /api/delete-google-drive-file acionado');

    const fileId = req.query.fileId;
    console.log('ID do arquivo:', fileId);

    if (!fileId) {
        console.log('ID do arquivo não fornecido.');
        return res.status(400).send('ID do arquivo não fornecido.');
    }

    console.log(`Tentando excluir o arquivo com ID do Google Drive: ${fileId}`);

    try {
        const response = await driveService.files.get({ fileId: fileId });
        console.log('Resposta da verificação do arquivo:', response.data);

        if (response.data.id) {
            console.log('Arquivo encontrado. Tentando excluir...');
            await driveService.files.delete({
                fileId: fileId,
            });
            console.log(`Arquivo com ID '${fileId}' excluído com sucesso do Google Drive.`);
            res.status(200).send(`Arquivo com ID '${fileId}' excluído com sucesso do Google Drive.`);
        } else {
            console.log(`Arquivo com ID '${fileId}' não encontrado no Google Drive.`);
            res.status(404).send(`Arquivo com ID '${fileId}' não encontrado no Google Drive.`);
        }
    } catch (deleteError) {
        console.error('Erro ao excluir arquivo do Google Drive:', deleteError);
        console.error(deleteError.stack);
        res.status(500).send('Erro ao excluir arquivo do Google Drive: ' + deleteError.message);
    }
});

app.listen(4000, () => {
    console.log('Servidor em execução na porta 4000');
});
