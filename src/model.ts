import { parseInt, isNumber } from "lodash-es";

export interface Questionnaire {
    questions: Question[];
}

export interface RefugeeData {
    name?: string
    number_of_people?: string
    location?: string
    contact_info?: string
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
