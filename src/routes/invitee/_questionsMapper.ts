export const modelKeyToFormKey = (key: string): string => {
  const modelKeyToFormKeyMap = {
    number_of_people: "people_amount",
    contact_info: "other_contacts",
  };

  return modelKeyToFormKeyMap[key] || key;
};
