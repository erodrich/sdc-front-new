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
                        <tr v-for="(ad) in ads" :key="ad.id">
                            <td><a @click="view(ad)">{{ad.title}}</a></td>
                            <td>{{ad.created_at}}</td>
                            <td>
                                <!-- <b-btn v-b-modal.modalEditAd variant="outline-secondary" @click="prepareEdit(ad)"><i class="ion-edit"></i></b-btn> -->
                                <router-link class="btn btn-outline-secondary"
                                             :to="{ name: 'adForm', params: { campaignId: campaign.id, id: ad.id } }"
                                             tag="button">
                                    <i class="ion-edit"></i>
                                </router-link>
                                <button type="button" class="btn btn-outline-danger" @click="deleteAd(ad.id)"><i class="ion-android-delete"></i></button>
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

        <!-- Modal Component -->
    <b-modal id="modalEditAd"
             ref="modalAd"
             title="Anuncio"
             @ok="handleOk"
             @shown="atShown"
             @cancel="clearNewAd">
      <form @submit.stop.prevent="handleSubmit">
            <div class="form-group">
                <label>Título</label>
                <input type="text"
                    class="form-control"
                    name="start_date"
                    v-model="newAd.title">
            </div>
            <div class="form-group">
                <label>Descripción</label>
                <input type="text"
                    class="form-control"
                    name="start_date"
                    v-model="newAd.description">
            </div>
            <div class="form-group">
                <label>Imagen de Previsualización</label>
                <input type="file"
                    id="file_image_pre"
                    ref="file_image_pre"
                    class="form-control"
                    :placeholder="newAd.image_pre_name"
                    @change="handleFileUpload()">
            </div>
            <div class="form-group">
                <label>Imagen principal</label>
                <input type="file"
                    id="file_image_full"
                    ref="file_image_full"
                    class="form-control"
                    :placeholder="newAd.image_full_name"
                    @change="handleFileUpload()">
            </div>
            <div class="form-group">
                <label>Video link:</label>
                <input type="text"
                    class="form-control"
                    name="endt_date"
                    v-model="newAd.video_url">
            </div>
            <div class="form-group">
                <label>Url link:</label>
                <input type="text"
                    class="form-control"
                    name="urlLink"
                    v-model="newAd.link_url">
            </div>
      </form>
    </b-modal>
    </div>
</template>
<script>
import { FETCH_ADS, AD_EDIT, AD_DELETE } from '@/store/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'AppAdList',
  data () {
    return {
      modalAd: {},
      newAd: {}
    }
  },
  computed: {
    ...mapGetters(['ads', 'campaign'])
  },
  mounted () {
    this.fetchAds()
  },
  methods: {
    fetchAds () {
      this.$store.dispatch(FETCH_ADS, { campaign: this.$route.params.id })
    },
    view (ad) {
      this.modalAd = ad
      $('#my-modal').modal('show')
    },
    /*
    handleFileUpload (e) {
      this.newAd.image_pre = this.$refs.file_image_pre.files[0]
      this.newAd.image_full = this.$refs.file_image_full.files[0]
    },
    prepareEdit (ad) {
      this.newAd = Object.assign({}, ad)
    },
    atShown () {
    },
    handleOk (evt) {
      evt.preventDefault()
      this.handleSubmit()
      this.fetchAds()
    },
    handleSubmit () {
      let formData = new FormData()
      formData.append('_method', 'PUT')
      formData.append('id', this.newAd.id)
      formData.append('title', this.newAd.title)
      formData.append('description', this.newAd.description)
      formData.append('image_pre', this.newAd.image_pre)
      formData.append('image_full', this.newAd.image_full)
      formData.append('video_url', this.newAd.video_url)
      formData.append('link_url', this.newAd.link_url)
      formData.append('campaign_id', this.campaign.id)
      console.log(formData.get('campaign_id'))
      this.$store.dispatch(AD_EDIT, formData)
      this.$refs.modalAd.hide()
    },
    clearNewAd () {
      this.newAd = {}
    },
    */
    deleteAd (id) {
      if (confirm('Seguro que desea eliminar este anuncio?')) {
        this.$store.dispatch(AD_DELETE, id)
          .then(res => this.fetchAds())
      }
      this.fetchAds()
    }
  }
}
</script>
