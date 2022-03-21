export interface Questionnaire {
  questions: Question[];
}

export interface RefugeeData {
  name?: string;
  number_of_people?: string;
  location?: string;
  contact_info?: string;
}

export interface Question {
  name: string;
  message: string;
  type?: "checkbox" | "field" | "number";
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
      type: "number",
      message: "Сколько человек поедет с вами в Израиль(включая вас)?",
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
      name: "contact_info",
      message: "Дополнительные способы связи (мессенджеры, email, соц. сети)",
    },
    {
      name: "has_animals",
      type: "checkbox",
      message: "Есть ли у вас животные?",
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
