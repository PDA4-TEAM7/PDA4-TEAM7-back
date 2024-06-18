import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

async function generateModels() {
    const configPath = path.resolve(__dirname, './config/config.json');
    const modelsPath = path.resolve(__dirname, './models');
    const dialect = 'mysql';
    const database = 'database_name';

    const command = `npx sequelize-typescript-generator generate-models --config ${configPath} --models ${modelsPath} --dialect ${dialect} --database ${database}`;

    try {
        const { stdout, stderr } = await execAsync(command);
        if (stderr) {
            console.error('Error:', stderr);
        }
        console.log('Output:', stdout);
    } catch (error) {
        console.error('Exec error:', error);
    }
}

generateModels();
