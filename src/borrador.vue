    <!-- Nuevo Campaña -->
    <div id="FormModal">
        <div id="my-modal" class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Nueva campaña</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form>
                    <div class="modal-body">
                            <div class="form-group">
                                <label>Nombre de Campaña</label>
                                <input type="text" class="form-control" placeholder="Nombre de campaña" value="About" v-model="newCampaign.name">
                            </div>
                            <div class="form-group">
                                <label>Vigente desde:</label>
                                <datepicker 
                                    v-model="startDate"
                                    placeholder="Fecha Inicio"
                                    format="yyyy-MM-dd"
                                    :bootstrap-styling="bootstrapStyling"
                                    :language="es"
                                    input-class="date"
                                    >
                                </datepicker>
                            </div>
                            <div class="form-group">
                                <label>Vigente hasta:</label>
                                <datepicker 
                                    v-model="endDate"
                                    placeholder="Fecha Fin"
                                    format="yyyy-MM-dd"
                                    :bootstrap-styling="bootstrapStyling"
                                    :language="es"
                                    input-class="date"
                                    >
                                </datepicker>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="exampleRadios1" v-model="newCampaign.active" v-bind:value="1" checked>
                                <label class="form-check-label" for="exampleRadios1">
                                    Activar
                                </label>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="saveCampaign()">Guardar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="clearNewCampaign()">Cancelar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>