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

const hostQuestionnaire: Questionnaire = {
  questions: [
    {
      name: "name",
      message: "Как вас зовут?",
    },

    /*
		table.string("name").notNullable();
		table.string("address").notNullable();
		table.string("living_env").notNullable();
		table.string("phone").notNullable();
		table.boolean("has_animals").notNullable().defaultTo(false);
		table.boolean("can_animals").notNullable().defaultTo(false);
		table.boolean("vacant").notNullable().defaultTo(true);
		table.bigInteger("tg_id").notNullable();
		table.string("tg_login").notNullable();
		*/
  ],
};
