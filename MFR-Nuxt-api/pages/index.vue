<script setup lang="ts">
import { ref } from "vue";
import type { LineItem } from "~/server/types/basket";
import type { Favorite } from "~/server/types/user";

const basketObj = ref({});
const userObj = ref({});
const discountObj = ref({});

function callPost(path: string) {
  fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dummyProduct()),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        basketObj.value = data;
      })
      .catch((error) => console.error(error));
}

function fetchBasket() {
  fetch("/api/basket/getbasket")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        basketObj.value = data;
      })
      .catch((error) => console.error(error));
}

function clearBasket() {
  fetch("/api/basket/clear")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        basketObj.value = data;
      })
      .catch((error) => console.error(error));
}

function dummyProduct(): LineItem {
  let k = Math.floor(Math.random() * 5);
  return {
    title: "title-" + k,
    price: 100,
    quantity: Math.floor(Math.random() * 5),
    sku: "sku-" + k,
    discountPercentage: Math.floor(Math.random() * 50),
  };
}

function getFavorites() {
  fetch("/api/user/favorites/getfavorites")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        userObj.value = data;
      })
      .catch((error) => console.error(error));
}

function postFavorite() {
  fetch("/api/user/favorites/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dummyFavoriteItem()),
  })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        userObj.value = data;
      })
      .catch((error) => console.error(error));
}

function dummyFavoriteItem(): Favorite {
  return {
    sku: "sku-" + Math.floor(Math.random() * 5),
  };
}

function getDiscount(userId: string) {
  fetch(`/api/user/personalDiscount/getPersonalDiscount?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        discountObj.value = data;
      })
      .catch((error) => console.error(error));
}
</script>

<template>
  <div>
    <h1>API</h1>

    <h2>Basket</h2>
    <ul>
      <li>
        <button v-on:click="fetchBasket()">GET: /api/basket/getbasket</button>
        <p>Returnerer kurv objekt</p>
      </li>
      <li>
        <button v-on:click="clearBasket">GET: /api/basket/clear</button>
        <p>Nulstiller kurven og returnerer tom kurv objekt</p>
      </li>
      <li>
        <button v-on:click="callPost('/api/basket/update')">
          POST: /api/basket/update
        </button>
        <p>
          Post et random sku med værdi mellem 0-4 (eks. sku-1)<br />Hvis sku er
          i listen fjernes det ellers tilføjes det.
        </p>
        <pre>body: {sku: string}</pre>
      </li>
    </ul>
    <pre>{{ basketObj }}</pre>

    <h2>User</h2>
    <ul>
      <li>
        <button v-on:click="getFavorites">
          GET: /api/user/favorites/getfavorites
        </button>
        <p>Returnerer et user objekt, hvor favorites listen fremgår</p>
      </li>

      <li>
        <button v-on:click="postFavorite">
          POST: /api/user/favorite/update
        </button>
        <p>
          Post et random sku med værdi mellem 0-4 (eks. sku-1)<br />
          Hvis sku er i listen fjernes det ellers tilføjes det.<br />
          Returnerer et user objekt, hvor favorites listen fremgår
        </p>
        <pre>body: {sku: string}</pre>
      </li>

      <li>
        <button v-on:click="getDiscount('')">
          GET: /api/user/personalDiscount/getPersonalDiscount
        </button>
        <p>Returnerer brugerens personlige rabat</p>
      </li>
    </ul>

    <pre>{{ userObj }}</pre>
    <pre>{{ discountObj }}</pre>
  </div>
</template>

<style>
ul {
  list-style-type: none;

  li {
    margin-bottom: 15px;
  }
}

button {
  padding: 10px;
  background-color: #7fff99;
  border: 1px solid #72db87;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #5ebe71;
  }
}

ul li p {
  padding: 5px 10px 25px;

  color: #525151;

  font-size: 14px;
  max-width: 450px;
}

pre {
  padding: 25px;
  background-color: rgb(255 251 245);
  border: 1px solid #ededed;
  margin: 15px 35px;
  border-radius: 24px;
  max-width: 520px;
}
</style>