import { parseInt, lowerCase } from "lodash-es";

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
    type?: "checkbox" | "field" | "number";
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
      type: "number",
      message: "Сколько человек поедет с вами в Израиль(включая вас)?",
      parse: parseInt,
      validate: (input: Number): boolean => input > 0,
    },
    {
      name: "location",
      message: "Где вы находитесь сейчас?",
    },
    {
      name: "phone",
      message: "Контактный телефон",
    },
    {
      name: "other_contacts",
      message: "Дополнительные способы связи (мессенджеры, email, соц. сети)",
    },
    {
      name: "has_animals",
      type: "checkbox",
      message: "Есть ли у вас животные?",
      parse: (input: string): boolean => lowerCase(input) == 'да',
    },
    {
      name: "additional_notes",
      message: "Дополнительные замечания (аллергии, медицинские состояния)",
    },
  ],
};

export const hostQuestionnaire: Questionnaire = {
  questions: [
    {
      name: "name",
      message: "Как вас зовут?",
    },
    {
      name: "address",
      message: "Ваш адрес",
    },
    {
      name: "living_env",
      message:
        "Информация о количестве комнат и людей которых вы готовы разместить",
    },
    {
      name: "phone",
      message: "Контактный телефон",
    },
    {
      name: "can_animals",
      type: "checkbox",
      message: "Могу приютить людей с животными",
    },
    {
      name: "has_animals",
      type: "checkbox",
      message: "Есть ли у вас животные?",
    },
  ],
};
