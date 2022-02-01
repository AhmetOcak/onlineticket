<script>
    import { link } from 'svelte-spa-router';

</script>

<main>
    <div class="card" style="width: 18rem;">
        <div class="card-header">
          Duyurular
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> <a href="/announcementPage" use:link>Turkish Airlines Lounge Hizmetlerindeki Değişiklikler</a> 
          </li>
          <li class="list-group-item"> <a href="/announcementPage" use:link>Güncel Seyahat Kuralları</a> </li>
          <li class="list-group-item"> <a href="/announcementPage" use:link>65 yaş ve Üstü Yolcularımızın Dikkatine</a> </li>
          <li class="text-primary list-group-item"> <a href="/announcementPage" use:link>Tümü</a></li>

        </ul>
      </div>
</main>

<style>
.card-header{
  font-size: 20px;
}

a{
  text-decoration: none;
  color: black;
}

</style>