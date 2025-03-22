<script lang="ts">
  import { supabase } from "$lib/supabase";
  import { createQuery } from "@tanstack/svelte-query";

  let imagePath = "/logo.jpg";

  // Rune สำหรับ state
  let searchQuery = $state("");

  // Query สำหรับค้นหาข้อมูลตาม mobile_model
  const searchQueryResult = createQuery({
    queryKey: ["searchMobile", () => searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      return await searchMobile(searchQuery);
    },
    enabled: () => !!searchQuery,
  });

  async function searchMobile(searchQuery: string) {
    const { data, error } = await supabase.from("mobilefilmstorage").select("mobile_model, shelf_number").like("mobile_model", `%${searchQuery}%`);
    if (error) throw error;
    return data;
  }

  function clickRow({ mobile_model }: { mobile_model: string }) {
    searchQuery = mobile_model;
    $searchQueryResult.refetch();
  }

  $effect(() => {
    searchQuery;
    $searchQueryResult.refetch();
  });
</script>

<!-- แสดงรูปภาพ -->
<div class="flex justify-center items-center w-full">
  <img src={imagePath} alt="Logo" class="w-50" />
</div>

<h1 class="text-2xl py-2 text-red-500">ค้นหาที่เก็บฟิลม์มือถือ ({$searchQueryResult.data?.length} รายการ)</h1>
<!-- ช่องค้นหา -->
<div class="relative">
  <input
    type="text"
    class="w-full border rounded-2xl pr-10 focus:outline-none focus:ring focus:border-blue-300"
    placeholder="ใส่ชื่อรุ่นมือถือ (เช่น iPhone 15 Pro Max)"
    autocomplete="off"
    bind:value={searchQuery}
  />
  <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
        clip-rule="evenodd"
      />
    </svg>
  </div>
</div>

<!-- แสดงผลการค้นหา -->
{#if $searchQueryResult.isLoading}
  <p class="text-blue-400">กำลังโหลด...</p>
{:else if $searchQueryResult.isError}
  <p class="text-red-500 py-2">เกิดข้อผิดพลาด: {$searchQueryResult.error.message}</p>
{:else if $searchQueryResult.data && searchQuery}
  <div class="py-2">
    <ul>
      {#each $searchQueryResult.data as item, index}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <li class={`p-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 cursor-pointer`} onclick={() => clickRow(item)}>
          <span class="text-blue-500">{item.mobile_model}</span> - ชั้นวาง: {item.shelf_number}
        </li>
      {/each}
    </ul>
  </div>
{:else if searchQuery}
  <p class="text-red-500 py-2">ไม่พบรุ่นมือถือ</p>
{/if}
