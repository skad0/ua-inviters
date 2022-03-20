import { parseInt, isNumber } from "lodash-es";

export interface Questionnaire {
    questions: Question[];
}

export interface RefugeeData {
    tg_id: number
    tg_login: string
    name?: string
    people_amount?: string
    location?: string
    other_contacts?: string
    current_question?: number
}

export interface Question {
    name: string;
    message: string;
    validate?: (input: any) => boolean;
    parse?: (input: string) => any;
}

export const RefugeeQuestionnaire: Questionnaire = {
    questions: [
        {
            name: "name",
            message: "Укажите ваше имя",
        },
        {
            name: "people_amount",
            message: "Сколько человек поедет с вами в Израиль?",
            parse: parseInt,
            validate: (input: Number): boolean => input > 0,
        },
        {
            name: "location",
            message: "Где вы находитесь сейчас?",
        },
        {
            name: "other_contacts",
            message: "Как с вами связаться?"
        }
    ]
}

const hostQuestionnaire: Questionnaire = {
    questions: [

    ]
}
