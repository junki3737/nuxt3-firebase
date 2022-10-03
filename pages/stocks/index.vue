<script setup lang="ts">
import { ref } from 'vue';
// import {
//   ErrorType,
//   ValidationRuleType,
//   ResultType,
//   StockCollectionsAddType,
// } from '@/types';
import { setUserSession } from '@/helper/SessionStorage';

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
const quantity = ref<Number>(0);
const referenceUrl = ref<string>('');
const selectedTag = ref<Array<string>>([]);
const memo = ref<string>('');
const formValidate = ref<boolean>(true);
const form = ref();
const isDialogOpen = ref<boolean>(false);
const tag = ref<string>('');


const rules= {
  required: (value: string) => !!value || '入力してください',
};
const { user, addUserTag, setUserState } = useUsers();
const { addStock } = useStocks();
const { uid } = useAuth();

const tags = computed(() => {
  return user ? user.value.tag : [];
});

// Method
const add = async () => {
  try {
    // バリデーションチェック
    // if (!formValidate) return;
    const { user } = useUsers();
    const { addStock } = useStocks();
    const collection = {
      commodityName: commodityName.value,
      quantity: Number(quantity.value),
      referenceUrl: referenceUrl.value,
      tag: selectedTag.value,
      memo: memo.value,
    };
    const result = await addStock(
      user.value.uid,
      collection
    );
    console.log(result);
    // ダッシュボード画面へ
    if (result.status === 200) {
      navigateTo('/dashboard');
    }
  } catch (e) {
    console.error(e);
  }
};

const addTag = async () => {
  console.info(tag.value);
  const { addUserTag, setUserState, user} = useUsers();
  await addUserTag(user.value.uid, tag.value);
  await setUserState(user.value.uid);
  await setUserSession(user.value.uid);

  // 初期化
  tag.value = '';
  isDialogOpen.value = false;
};
const quantityPull = () => {
  if (Number(quantity.value) < 1) return;
  quantity.value = Number(quantity.value) - 1;
};
const quantityAdd = () => {
  quantity.value = Number(quantity.value) + 1;
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
        <!-- <v-row>
          <v-col>
            <v-text-field
              v-model="tag"
              :label="label.tag"
              :name="label.tag"
            />
          </v-col>
        </v-row> -->
        <v-row>
          <v-checkbox
            v-for="(tag , key) in tags"
            v-model="selectedTag"
            :label="tag"
            :value="tag"
            :key="key"
            hide-details
          />
        </v-row>
        <v-row justify="center">
          <v-dialog
            v-model="isDialogOpen"
            persistent
            max-width="600px"
            content-class="dialogContents"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                :color="'error'"
                :size="'large'"
                :variant="'outlined'"
                >タグ追加</v-btn
              >
            </template>
            <v-card>
              <v-container>
                <v-card-title>
                  <span class="text-h5">追加画面</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-text-field
                      v-model="tag"
                      hide-details
                      label="タグ"
                    ></v-text-field>
                  </v-row>
                </v-card-text>
                <v-card-actions class="mt-5">
                  <v-row justify="center">
                    <v-col>
                      <v-btn
                        :size="'large'"
                        :variant="'outlined'"
                        @click="isDialogOpen = false"
                        >閉じる</v-btn
                      >
                    </v-col>
                    <v-col>
                      <v-btn
                        :size="'large'"
                        @click="addTag"
                        :disabled="!tag"
                        >追加</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-dialog>
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
