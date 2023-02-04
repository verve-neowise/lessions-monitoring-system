import { MaterialResponse } from '@models/lesson.dto';
import { updateLessonMaterial } from '@services/lesson.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        // TODO: implement get material
    }
    catch(err) {
        next(err)
    }
}