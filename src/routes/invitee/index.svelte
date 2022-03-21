<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { validators } from "$lib/validators/invitee";
  import { RefugeeQuestionnaire } from "../../model";
  import { modelKeyToFormKey } from "./_questionsMapper";

  const initialValues = RefugeeQuestionnaire.questions.reduce(
    (values, question) => {
      values[modelKeyToFormKey(question.name)] =
        RefugeeQuestionnaire.questions[question.name]?.type === "boolean"
          ? false
          : "";
      return values;
    },
    {}
  );

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: yup.object().shape(validators),
    onSubmit: (values) => {
      console.log("submit", values);
    },
  });
</script>

<form on:submit={handleSubmit}>
  {#each RefugeeQuestionnaire.questions as question}
    {@const key = modelKeyToFormKey(question.name)}
    <div class="form-control w-full max-w-xs">
      <label class="label" for={key}>
        <span class="label-text">{question.message}</span>
      </label>
      <input
        id={key}
        name={key}
        type={question.type === "checkbox" ? "checkbox" : "text"}
        placeholder=""
        value={$form[key]}
        onChange={handleChange}
        onBlur={handleChange}
        class={`${
          question.type === "checkbox"
            ? "checkbox"
            : "input input-bordered w-full max-w-xs"
        }`}
      />
      {#if $errors[key]}
        <label class="label" for="">
          <span class="label-text-alt">{$errors[key]}</span>
        </label>
      {/if}
    </div>
  {/each}
  <button type="submit" class="btn btn-primary my-4"> Отправить </button>
</form>
