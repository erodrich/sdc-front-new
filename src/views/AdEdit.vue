<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h5 class="d-flex justify-content-between align-items-center">
                    Anuncio
                </h5>
            </div>
            <div class="card-body">
                <form @submit.stop.prevent="handleSubmit">
                    <div class="form-group row" :class="{invalid: $v.newAd.title.$error}">
                        <label class="col-sm-2 col-form-label">Título: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   @blur="$v.newAd.title.$touch()"
                                   v-model="newAd.title">
                        </div>
                    </div>
                    <div class="form-group row" :class="{invalid: $v.newAd.description.$error}">
                        <label class="col-sm-2 col-form-label">Descripción: </label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   @blur="$v.newAd.description.$touch()"
                                   v-model="newAd.description">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Contenido:</label>
                        <div class="col-sm-10">
                            <textarea class="form-control"
                                      id="exampleFormControlTextarea3"
                                      rows="7"
                                      v-model="newAd.body"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Enlace a video:</label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   name="endt_date"
                                   v-model="newAd.video_url">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Enlace a otras fuentes:</label>
                        <div class="col-sm-10">
                            <input type="text"
                                   class="form-control"
                                   name="urlLink"
                                   v-model="newAd.link_url">
                        </div>
                    </div>
                    <hr>
                    <h5>
                        Imagen Principal
                        <small class="text-muted">Ocupará gran parte de la pantalla del dispositivo cliente.</small>
                    </h5>
                    <p>
                        <div>
                            <img id="image_full" :src="newAd.image_full_url" style="width: 200px; "/>
                        </div>

                        <div class="input-group mt-1">
                            <button class="btn btn-outline-info" type="button" @click="openInputFull()">Cargar imagen</button>
                            <input type="file"
                                   id="file_image_full"
                                   ref="file_image_full"
                                   style="display:none"
                                   @change="handleFileUpload('full')" />
                        </div>
                    </p>

                    <h5>
                        Imagen en lista
                        <small class="text-muted">Se visualizará en el listado de anuncios.</small>
                    </h5>
                    <p>
                        <div>
                            <img id="image_pre" :src="newAd.image_pre_url" style="width: 200px; "/>
                        </div>
                        <div class="input-group mt-1">
                            <button class="btn btn-outline-info" type="button" @click="openInputPre()">Cargar imagen</button>
                            <input type="file"
                                   id="file_image_pre"
                                   ref="file_image_pre"
                                   style="display:none"
                                   @change="handleFileUpload('pre')" />
                        </div>
                    </p>

                    <hr>
                    <div class="form-group row justify-content-center">
                        <div class="col-sm-3 ">
                            <button type="submit" class="btn btn-info w-100">Guardar</button>
                        </div>
                        <div class="col-sm-3 ">
                            <router-link
                                    :to="{ name: 'campaign', params: { id: campaign.id }}"
                                    tag="button"
                                    class="btn btn-danger btn-block">Volver
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { FETCH_ADS,
  AD_NEW,
  AD_EDIT,
  MARK_AS_LOADING,
  MARK_AS_NOT_LOADING
} from '@/store/actions.type'
import {required} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

function handleFiles (files, id) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    var imageType = /image.*/

    if (!file.type.match(imageType)) {
      continue
    }

    var img = document.getElementById(id)
    img.classList.add('obj')
    img.file = file

    var reader = new FileReader()
    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result } })(img)
    reader.readAsDataURL(file)
  }
}

export default {
  name: 'AdEdit',
  data () {
    return {
      newAd: {
        title: '',
        description: '',
        body: '',
        image_pre: '',
        image_full: '',
        video_url: '',
        link_url: ''
      },
      editFlag: false
    }
  },
  validations: {
    newAd: {
      title: {
        required
      },
      description: {
        required
      }
    }
  },
  computed: {
    ...mapGetters(['campaign', 'ad'])
  },
  created () {
    if (this.$route.params.id) {
      this.editFlag = true
      this.fetchAd()
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(MARK_AS_LOADING)
      let formData = new FormData()
      formData.append('title', this.newAd.title)
      formData.append('description', this.newAd.description)
      formData.append('video_url', this.newAd.video_url)
      formData.append('link_url', this.newAd.link_url)
      formData.append('body', this.newAd.body)
      formData.append('campaign_id', this.$route.params.campaignId)
      if (this.editFlag) {
        formData.append('_method', 'PUT')
        formData.append('id', this.newAd.id)
        if (typeof this.newAd.image_pre === 'object') {
          formData.append('image_pre', this.newAd.image_pre)
        }
        if (typeof this.newAd.image_full === 'object') {
          formData.append('image_full', this.newAd.image_full)
        }
        this.$store.dispatch(AD_EDIT, formData)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            alert('Anuncio actualizado con éxito')
            window.history.back()
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      } else {
        formData.append('image_pre', this.newAd.image_pre)
        formData.append('image_full', this.newAd.image_full)
        this.$store.dispatch(AD_NEW, formData)
          .then(res => {
            this.$store.dispatch(MARK_AS_NOT_LOADING)
            alert('Anuncio añadido con éxito')
          })
          .catch(error => {
            console.log(error)
            this.$store.dispatch(MARK_AS_NOT_LOADING)
          })
      }
    },
    fetchAd () {
      this.$store.dispatch(FETCH_ADS, { campaign: this.$route.params.campaignId, id: this.$route.params.id })
        .then(res => {
          this.newAd = this.ad
          console.log(this.newAd)
        })
    },
    handleFileUpload (type) {
      console.log(this.$refs.file_image_full.files[0])
      console.log(this.$refs.file_image_pre.files[0])
      if (type === 'full') {
        this.newAd.image_full = this.$refs.file_image_full.files[0]
        handleFiles(this.$refs.file_image_full.files, 'image_full')
      }
      if (type === 'pre') {
        this.newAd.image_pre = this.$refs.file_image_pre.files[0]
        handleFiles(this.$refs.file_image_pre.files, 'image_pre')
      }
    },
    openInputFull () {
      var inputFile = document.getElementById('file_image_full')
      inputFile.click()
    },
    openInputPre () {
      var inputFile = document.getElementById('file_image_pre')
      inputFile.click()
    }
  }
}

</script>
<style>
    .invalid input {
        border: 1px solid red;
        background-color: #ffd7c7;
    }
</style>
