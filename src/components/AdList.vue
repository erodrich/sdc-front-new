<template>
    <div class="adTable">
        <div class="card">
            <div class="card-header">
                <h6>Listado de anuncios</h6>
            </div>
            <div class="card-body">
                <table class="table table-striped table-hover">
                    <thead>
                        <th>Titulo</th>
                        <th>Creado</th>
                        <th></th>   
                    </thead>
                    <tbody>
                        <tr v-for="(ad, index) in ads" :key="index">
                            <td><a @click="view(ad)">{{ad.title}}</a></td>
                            <td>{{ad.created_at}}</td>
                            <td>
                                <i class="ion-ios-plus-outline" @click="a"></i>
                                <ion-icon name="heart"></ion-icon>  
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Detalle Anuncio -->
        <div id="AdModal">
            <div id="my-modal" class="modal fade">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Vista Previa</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img :src="modalAd.image_full_url" alt="">
                            <hr>
                            <h5>{{ modalAd.title }}</h5>
                            <p class="lead"> {{ modalAd.description }}</p>
                            <hr>
                            <button class="btn btn-primary" :href="modalAd.link_url">Enlace</button>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { FETCH_ADS } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "AppAdList",
  data() {
    return {
      modalAd: {}
    };
  },
  computed: {
    ...mapGetters(["ads"])
  },
  mounted() {
    this.fetchAds();
  },
  methods: {
    fetchAds() {
      this.$store.dispatch(FETCH_ADS, { campaign: this.$route.params.id });
    },
    view(ad) {
      this.modalAd = ad;
      $("#my-modal").modal("show");
    },
    a(){
        
    }
  }
};
</script>

