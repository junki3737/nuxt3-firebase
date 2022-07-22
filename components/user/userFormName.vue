<script setup lang="ts">
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    type: string
    label: string
    rules: Array<string>
  }>(),
  {
    type: "",
    label: "",
    rules: undefined
  }
);

const data = ref("");

interface Emits{
  (e: "setEmail", value: string): void;
  (e: "setPassword", value: string): void;
}
const emit = defineEmits<Emits>();

const email = computed({
  get: () => {
    return data.value;
  },
  set: (newValue: string) => {
    data.value = newValue;
    emit("setEmail", newValue);
  }
});

const password = computed({
  get: () => {
    return data.value;
  },
  set: (newValue: string) => {
    data.value = newValue;
    emit("setPassword", newValue);
  }
});

const show = ref(false)

</script>

<template>
  <div>
    <div v-if="type == 'email'">
      <v-text-field
        v-model="email"
        :type="type"
        :label="label"
        :rules="rules"
        variant="underlined"
      />
    </div>
    <div v-if="type == 'password'">
      <v-text-field
        v-model="password"
        :label="label"
        :rules="rules"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off' "
        :type="show ? 'text' : 'password'"
        variant="underlined"
        @click:append="show = !show"
      />
    </div>
  </div>
</template>
