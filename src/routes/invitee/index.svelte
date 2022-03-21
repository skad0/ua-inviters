<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { validators } from "$lib/validators/invitee";
  import { RefugeeQuestionnaire } from "../../model";
  import Spin from "$lib/shared/Spin.svelte";
  import { modelKeyToFormKey } from "$lib/utils/_questionsMapper";

  let isLoading: boolean = false;
  let isError: boolean = false;
  let message: string;

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
    onSubmit: async (values) => {
      isLoading = true;
      console.log("submit", values);
      try {
        const inserted = await fetch("/invitee/add.json", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (inserted.status >= 200 && inserted.status < 300) {
          message = "Ваша заявка отправлена";
        } else {
          isError = true;
          message = "Произошла ошибка, заявка не была отправлена";
        }
      } catch (e) {
        console.error("error in invitee add", e);
        isError = true;
        message =
          "Ошибка при отправке заявки на сервер, попробуйте еще раз позже";
      }
      isLoading = false;
    },
  });

  const onW = (e) => {
    console.log("tuta", e);
    handleSubmit(e);
  };
</script>

<svelte:head>
  <title>Получить помощь от граждан Израиля</title>
</svelte:head>

<h1 class="text-2xl mb-4">Оставить заявку на получение помощи</h1>

<form on:submit={onW} class="flex flex-col">
  {#each RefugeeQuestionnaire.questions as question}
    {@const key = modelKeyToFormKey(question.name)}
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
  <button
    disabled={isLoading}
    class:btn-disabled={isLoading}
    type="submit"
    class="btn btn-primary my-4"
  >
    Отправить
    {#if isLoading}
      <Spin size="lg" class="ml-2" />
    {/if}
  </button>
</form>

{#if message}
  <div
    class="alert shadow-lg"
    class:alert-success={!isError}
    class:alert-danger={isError}
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <span>{message}</span>
    </div>
  </div>
{/if}
