<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { validators } from "$lib/validators/invitee";
  import { hostQuestionnaire } from "../../model";

  const initialValues = hostQuestionnaire.questions.reduce(
    (values, question) => {
      values[question.name] =
        hostQuestionnaire.questions[question.name]?.type === "boolean"
          ? false
          : "";
      return values;
    },
    {}
  );

  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues,
    validationSchema: yup.object().shape(validators),
    onSubmit: async (values) => {
      console.log("dsdsds");
      console.log("submit", values);
    },
  });

  const onW = (e) => {
    console.log("tuta", e);
    handleSubmit(e);
  };
</script>

<svelte:head>
  <title>Оказать помощь украинским беженцам</title>
</svelte:head>

<h1 class="text-2xl mb-4">Оставить заявку на оказание помощи</h1>

<form on:submit={onW} class="flex flex-col">
  {#each hostQuestionnaire.questions as question}
    {@const key = question.name}
    {@const type = question.type === "checkbox" ? "checkbox" : "text"}
    <div class="form-control w-full">
      <label class="label" for={key}>
        <span class="label-text">{question.message}</span>
      </label>
      {#if type === "checkbox"}
        <input
          id={key}
          name={key}
          type="checkbox"
          bind:value={$form[key]}
          on:change={handleChange}
          on:blur={handleChange}
          class="checkbox"
        />
      {:else}
        <input
          id={key}
          name={key}
          type="text"
          placeholder=""
          bind:value={$form[key]}
          on:change={handleChange}
          on:blur={handleChange}
          class="input input-bordered w-full"
        />
      {/if}
      {#if $errors[key]}
        <label class="label" for="">
          <span class="label-text-alt">{$errors[key]}</span>
        </label>
      {/if}
    </div>
  {/each}
  <button type="submit" class="btn btn-primary my-4"> Отправить </button>
</form>
