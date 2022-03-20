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
    validator?: (input: string) => boolean;
}

export const RefugeeQuestionnaire: Questionnaire = {
    questions: [
        {
            name: "name",
            message: "Укажите ваше имя",
        },
        {
            name: "number_of_people",
            message: "Сколько человек поедет с вами в Израиль?",
        },
        {
            name: "location",
            message: "Где вы находитесь сейчас?",
        },
        {
            name: "contact_info",
            message: "Как с вами связаться?"
        }
    ]
}

const hostQuestionnaire: Questionnaire = {
    questions: [

    ]
}
