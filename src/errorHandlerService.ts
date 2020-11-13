import { ErrorGrowPos } from "models/smartIndustry/error";


export class ErrorHandler {

    public routes(app): void {

        app.use((req, res, next) => {
            let error: ErrorGrowPos = new Error('Not Found');
            error.status = 404
            next(error);
        })

        app.use((error: ErrorGrowPos, req, res, next) => {
            res.status(error.status || 500)
            res.json({
                status: error.status,
                message: error.message
            })
        })
    }
}