<script setup lang="ts">
import { ref } from 'vue';
// import {
//   ErrorType,
//   ValidationRuleType,
//   ResultType,
//   StockCollectionsAddType,
// } from '@/types';

definePageMeta({
  middleware: ['auth'],
});

// type RuleType = {
//   required: ValidationRuleType;
// };
type LabelType = {
  commodityName: string;
  quantity: string;
  referenceUrl: string;
  tag: string;
  memo: string;
};

const label: LabelType = {
  commodityName: '商品名',
  quantity: '在庫数',
  referenceUrl: '参考URL',
  tag: 'タグ名',
  memo: 'メモ',
} as const;

const commodityName = ref<string>('');
const quantity = ref<string>('');
const referenceUrl = ref<string>('');
const tag = ref<string>('');
const memo = ref<string>('');
const formValidate = ref<boolean>(true);
const form = ref();

const rules= {
  required: (value: string) => !!value || '入力してください',
};

// Method
const add = async () => {
  console.info("登録作業開始")
  try {
    // バリデーションチェック
    // if (!formValidate) return;
    const { user } = useUsers();
    const { addStock } = useStocks();
    const collection: StockCollectionsAddType = {
      commodityName: commodityName.value,
      quantity: Number(quantity.value),
      referenceUrl: referenceUrl.value,
      tag: ['日用品', 'ダイソー'],
      memo: memo.value,
    };
    console.info("登録作業")
    const result= (await addStock(
      user.value.uid,
      collection
    ));
    return navigateTo('/dashboard', { replace: true });
  } catch (e) {
    console.error(e);
  }
};
</script>
<template>
<div>
  <h1>ストック追加ページ</h1>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="commodityName"
              :label="label.commodityName"
              :name="label.commodityName"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="quantity"
              :label="label.quantity"
              :name="label.quantity"
              :rules="[rules.required]"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="referenceUrl"
              :label="label.referenceUrl"
              :name="label.referenceUrl"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="tag"
              :label="label.tag"
              :name="label.tag"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="memo"
              :label="label.memo"
              :name="label.memo"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              @click="add"
              :size="'x-large'"
              >登録</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
</div>
</template>
