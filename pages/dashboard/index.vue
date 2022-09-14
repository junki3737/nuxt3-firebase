<script setup>

definePageMeta({
  middleware: ['auth'],
});

const { user } = useUsers();
const { getUser } = useUsers();
console.info('=== dashboard ===');
console.info(process.server);
console.info(user.value.uid);
const userInfo = await getUser(user.value.uid);
console.info(userInfo)
const { getStockList, stockList } = useStocks();
const stocks = await getStockList(user.value.uid);
console.info(stocks)

const signout = async () => {
  try {
    const { signOut } = useAuth();
    await signOut();
    // サインイン画面へ
    return navigateTo('/auth/signin');
    // 初期化
  } catch (e) {
    console.error(e);
  }
};

const addStock = () => {
  return navigateTo('/stocks');
};
onMounted(() => {
  // リアルタイム取得させる場合
  const { getOnStockList } = useStocks();
  getOnStockList(user.value.uid);
});
</script>
<template>
    <div>
  <h1>this is dashboard page</h1>
  <button @click="signout">サインアウト</button>
        <p>■ Firestore 取得 | users</p>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">uid</th>
            <th class="text-left">displayName</th>
            <th class="text-left">email</th>
            <th class="text-left">photoUrl</th>
            <th class="text-left">tag</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ user ? user.uid : '' }}</td>
            <td>{{ user ? user.displayName : '' }}</td>
            <td>{{ user ? user.email : '' }}</td>
            <td>{{ user ? user.photoUrl : '' }}</td>
            <td>{{ user ? user.tag : '' }}</td>
          </tr>
        </tbody>
      </v-table>
      <br />
      <p>■ Firestore 取得 | stocks</p>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">商品名</th>
            <th class="text-left">数量</th>
            <th class="text-left">タグ</th>
            <th class="text-left">URL</th>
            <th class="text-left">メモ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stocks" :key="stock.id">
            <td>{{ stock.id }}</td>
            <td>{{ stock.commodityName }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.tag }}</td>
            <td>{{ stock.referenceUrl }}</td>
            <td>{{ stock.memo }}</td>
          </tr>
        </tbody>
      </v-table>
            <br />
      <p>■ Firestore リアルタイム 取得 | stocks</p>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">id</th>
            <th class="text-left">商品名</th>
            <th class="text-left">数量</th>
            <th class="text-left">タグ</th>
            <th class="text-left">URL</th>
            <th class="text-left">メモ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in stockList" :key="stock.id">
            <td>{{ stock.id }}</td>
            <td>{{ stock.commodityName }}</td>
            <td>{{ stock.quantity }}</td>
            <td>{{ stock.tag }}</td>
            <td>{{ stock.referenceUrl }}</td>
            <td>{{ stock.memo }}</td>
          </tr>
        </tbody>
      </v-table>
        <v-btn
        @click="addStock"
        color="#99F"
        width="300"
      >
        ストックの追加
      </v-btn>
    </div>
</template>