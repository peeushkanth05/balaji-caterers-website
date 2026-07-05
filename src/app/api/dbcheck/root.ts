import fs from "fs";
import path from "path";

export async function GET() {
    const cwd = process.cwd();

    const paths = [
        path.join(cwd, "prisma", "dev.db"),
        path.join(cwd, "dev.db"),
    ];

    return Response.json({
        cwd,
        files: paths.map((p) => ({
            path: p,
            exists: fs.existsSync(p),
        })),
    });
}