import { computed, reactive, readonly, watch } from 'vue';

interface ItemCart extends addItemCart {
  quantity: number;
}

type addItemCart = {
  id: number;
  name: string;
  price: number;
};

const STATE_NAME = 'SHOP-CART';

const defaultState = {
  items: [],
  cartView: false,
};

const getDefaultState = () => {
  if (localStorage.getItem(STATE_NAME) !== null) {
    return JSON.parse(localStorage.getItem(STATE_NAME));
  }
  return defaultState;
};

let state = reactive(getDefaultState());

const getters = {
  getItems: () =>
    computed(() => {
      return state.items;
    }),
  getCartView: () => {
    return !!state.cartView;
  },

  countItensCart: () => state.items.length,

  countQuantityCart: () =>
    computed(() =>
      state.items.reduce((total: number, item: ItemCart) => {
        return total + item.quantity;
      }, 0)
    ),

  getTotal: computed(() =>
    state.items.reduce((total: number, item: ItemCart) => {
      return total + item.quantity * item.price;
    }, 0)
  ),
};
const actions = {
  setCartView: () => {
    state.cartView = !state.cartView;
  },

  addItemToCart: ({ id, name, price }: addItemCart) => {
    const existItem = state.items.find((item: ItemCart) => item.id === id);

    if (!existItem) return state.items.push({ id, name, price, quantity: 1 });

    const updateItens: ItemCart[] = state.items.map((item: ItemCart) => {
      if (item.id === id) {
        item.quantity++;
      }
      return item;
    });
    state.items = updateItens;
    return;
  },

  removeItemToCart: (id: number) => {
    const existItem = state.items.find((item: ItemCart) => item.id === id);

    if (existItem) {
      const updateItens = state.items.filter(
        (item: ItemCart) => item.id !== id
      );
      state.items = updateItens;
    }
    return;
  },

  decItemCart: (id: number) => {
    const existItem = state.items.find((item: ItemCart) => item.id === id);

    if (!existItem) return;

    const updateItens = state.items.map((item: ItemCart) => {
      if (item.id === id) item.quantity--;
      return item;
    });

    state.items = updateItens.filter((item: ItemCart) => item.quantity >= 1);
  },
};

watch(
  () => state,
  () => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  },
  {
    deep: true,
  }
);

export default () => {
  if (localStorage.getItem(STATE_NAME) === null) {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  }
  return {
    state: readonly(state),
    ...actions,
    ...getters,
  };
};
