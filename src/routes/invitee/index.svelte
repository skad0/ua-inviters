<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { validators } from "$lib/validators/invitee";
  import { RefugeeQuestionnaire } from "../../model";
  import { modelKeyToFormKey } from "$lib/utils/_questionsMapper";

  let isLoading: boolean = false;

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
      const inserted = await fetch("/invitee/add.json", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("inserted", inserted);
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
    {#if !isLoading}
      <div
        class="radial-progress text-secondary ml-4 spin"
        style="--value:70; --size: 2rem"
      />
    {/if}
  </button>
</form>

<style lang="scss">
  @property --value {
    syntax: "<number>"; /* <- defined as type number for the transition to work */
    initial-value: 0;
    inherits: false;
  }
  @keyframes spin {
    from {
      --value: 0;
    }
    to {
      --value: 100;
    }
  }

  .spin {
    animation-duration: 3s;
    animation-name: spin;
  }
</style>
