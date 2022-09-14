import {
    ResultType,
    UidType,
    StockCollectionsType,
    StockCollectionsAddType,
  } from '@/types';
  import {
    Firestore,
    getDocs,
    collection,
    onSnapshot,
    setDoc,
    doc,
  } from 'firebase/firestore';
  const CollectionName = 'stocks';
  export const useStocks = () => {
    const stockList = useState<Array<StockCollectionsType>>(
      'stockList',
      () => []
    );
  
    async function getStockList(uid: UidType) {
      if (!uid) return;
      const db: Firestore = useState('db').value as Firestore;
      const snapshot = await getDocs(
        collection(db, `${CollectionName}/${uid}/collections`)
      );
      const lists = new Array<StockCollectionsType>();
      snapshot.docs.map((doc) => {
        const collection = doc.data() as StockCollectionsType;
        lists.push({ ...collection, id: doc.id });
      });
      return lists;
    }
    async function getOnStockList(uid: UidType) {
      if (!uid) return;
      const db: Firestore = useState('db').value as Firestore;
      const collectionRef = collection(
        db,
        `${CollectionName}/${uid}/collections`
      );
      onSnapshot(collectionRef, (snapshot) => {
        const lists = new Array<StockCollectionsType>();
        snapshot.docs.map((doc) => {
          const collection = doc.data() as StockCollectionsType;
          lists.push({ ...collection, id: doc.id });
        });
        stockList.value = lists;
      });
    }
    async function addStock(
      uid: UidType,
      collections: StockCollectionsAddType
    ) {
      if (!uid) return;
      try {
        const db: Firestore = useState('db').value as Firestore;
  
        const collectionRef = doc(
          collection(db, `${CollectionName}/${uid}/collections`)
        );
        await setDoc(collectionRef, collections);
        // TODO: とりあえず
        return {
          status: 200,
          errorCode: '',
          description: '',
        } as ResultType;
      } catch (e: any) {
        console.error(e);
        // TODO: とりあえず
        return {
          status: 500,
          errorCode: '',
          description: '',
        } as ResultType;
      }
    }
    return { getStockList, getOnStockList, addStock, stockList };
  };
  