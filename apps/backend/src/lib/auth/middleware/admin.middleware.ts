import { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            res.status(401).json({ error: "Unauthorized: Please log in" });
            return;
        }

        // Verificamos si el rol del usuario es admin
        // Better Auth guarda los campos adicionales en session.user
        if (session.user.role !== "admin") {
            res.status(403).json({ error: "Forbidden: Admin access required" });
            return;
        }

        (req as any).user = session.user;
        (req as any).session = session.session;

        next();
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        res.status(500).json({ error: "Internal Server Error in Authentication" });
    }
};
