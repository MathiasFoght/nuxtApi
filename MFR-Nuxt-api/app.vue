<template>
  <div>
    <main class="main-page">
      <NuxtErrorBoundary @error="emitError">
        <NuxtPage />
        <template #error="{ error, clearError }">
          <div class="error-message">
            <p>statusCode:{{ error.value.statusCode }}</p>
            <p>statusMessage: {{ error.value.statusMessage }}</p>
            <p>message: {{ error.value.message }}</p>

            <button @click="resolveError(error, clearError)">
              Go to frontpage
            </button>
          </div>
        </template>
      </NuxtErrorBoundary>
    </main>
  </div>
</template>

<script lang="ts" setup>
async function resolveError(_error: Object, _clearError: Function) {
  await navigateTo("/");
  _clearError();
}

function emitError(error: any) {
  throw createError(error);
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
a {
  text-decoration: none;
  color: blue;
  font-size: 24px;
}

a:hover {
  text-decoration: underline;
}
</style>
