<script>
import { ref } from 'vue'
import { useNotice } from '../hooks/useNotice.js'
import Field from '../components/UI/Field.vue'
import ModalDialog from '../components/UI/ModalDialog.vue'
import Dropdown from '../components/UI/Dropdown.vue'
import SidePanel from '../components/UI/SidePanel.vue'

export default {
    name: 'Home',
    components: { SidePanel, Dropdown, ModalDialog, Field },
    setup() {
        const value = ref('')
        const showModal = ref(false)
        const showPanel = ref(false)
        const { errorNotice, successNotice } = useNotice()
        const dropdownOptions = [
            { label: 'Action click', action: () => successNotice({ message: 'Action click' }) },
            { label: 'Route to click', to: '/' },
            { label: 'Some label 1' },
            { label: 'Some label 2' },
            { label: 'Some label 3' },
        ]

        return { value, showModal, showPanel, dropdownOptions, errorNotice, successNotice }
    },
}
</script>

<template>
    <div class="components">
        <div class="components__title">Typography</div>
        <div>
            <h1 class="text-h1">Estimating your team's tasks</h1>
            <h2 class="text-h2">Sed ut perspiciatis unde <br> omnis iste natus</h2>
            <h3 class="text-h3">Sed ut perspiciatis unde <br> omnis iste natus</h3>
            <h4 class="text-h4">Sed ut perspiciatis unde <br> omnis iste natus</h4>
            <h5 class="text-h5">Sed ut perspiciatis unde <br> omnis iste natus</h5>
            <p class="text-p">Sed ut perspiciatis unde <br> omnis iste natus</p>
            <h6 class="text-h6">Sed ut perspiciatis unde <br> omnis iste natus</h6>
        </div>
        <div class="components__title">Buttons</div>
        <div>
            <button class="button-large button-icon-left">
                <mdi-cloud-upload />
                Primary Call to Action
            </button>
            <button class="button-large button-icon-right">
                <mdi-chevron-right />
                Primary Call to Action
            </button>
            <button>
                Small Call to Action
            </button>
            <button class="button-large button-icon-left outline">
                <mdi-cloud-upload />
                Primary Call to Action
            </button>
            <button class="button-large button-icon-right outline">
                <mdi-chevron-right />
                Primary Call to Action
            </button>
            <button class="outline">
                Small Call to Action
            </button>
        </div>
        <div class="components__title">Fields</div>
        <div>
            <Field v-model="value" placeholder="Enter e-mail" label="Default text Input"
                   description="Description: Text input" />
            <Field v-model="value" label="Default number Input" type="number" error="Error message"
                   description="Description: Number input" />
            <Field v-model="value" label="Default password Input" type="password" success="Success message"
                   description="Description: Password input" />
            <Field v-model="value" label="Default disabled input" disabled description="Description: Disabled input" />
        </div>
        <div class="components__title">Modal</div>
        <div>
            <button @click="showModal = !showModal" class="outline">
                Show modal
            </button>
            <ModalDialog v-model="showModal" title="Custom title">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean leo libero, vestibulum hendrerit
                    diam a, ultricies dapibus nisi. Nullam turpis metus, iaculis eget sapien mattis, convallis suscipit
                    est. Morbi diam urna, auctor nec dapibus id, tincidunt non odio. Cras a elementum est. Vestibulum
                    ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis
                    egestas lacus et lacinia. Sed vehicula dignissim ipsum at tincidunt. Etiam arcu elit, rutrum in
                    ultrices eget, interdum sed tellus. Proin turpis elit, ultricies ut mauris quis, mollis dictum
                    mauris. Suspendisse ornare non dolor et facilisis. In egestas dui non risus ultricies tempus.
                    Aliquam hendrerit augue lectus, ultricies fermentum ligula varius ut. Quisque sit amet hendrerit
                    dolor.
                </p>
                <p>
                    Pellentesque ut purus ultrices, dignissim leo eu, sodales tellus. Maecenas non massa eget massa
                    interdum sagittis. Morbi condimentum tempor enim, a sagittis urna rutrum eget. Aenean non tincidunt
                    augue. Suspendisse elementum euismod vulputate. Donec eros felis, accumsan vitae eleifend eget,
                    pharetra feugiat dui. Sed aliquet aliquam ipsum vel tincidunt. Nullam vel nibh congue, lobortis
                    lectus ac, vulputate arcu. Duis dui nunc, iaculis vitae nisi id, bibendum blandit mauris. Donec
                    vitae ullamcorper nunc, nec varius metus. Donec a dapibus magna. Vivamus ultricies, eros at aliquet
                    pulvinar, est mi efficitur est, sed porta arcu libero sit amet ligula. Mauris ac sagittis ex.
                </p>
                <p>
                    Morbi aliquam erat vel diam interdum dictum sit amet sit amet lorem. Phasellus blandit augue ut
                    libero placerat, vel imperdiet est luctus. Proin condimentum, libero eget sodales pulvinar, ligula
                    est interdum arcu, vitae pellentesque nunc nisi quis libero. Curabitur dapibus pharetra mi, id
                    euismod est fermentum in. Maecenas ornare leo velit, quis vestibulum neque iaculis eu. In in nunc
                    ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                    Pellentesque pharetra augue eu lectus egestas aliquam. Sed rutrum scelerisque mi sit amet ornare.
                    Vivamus quis tincidunt risus. Donec arcu sapien, consequat vitae commodo non, dictum eget nibh.
                </p>
                <p>
                    Fusce in fringilla neque, at dictum justo. Morbi vitae libero metus. In ut nunc ut lectus sagittis
                    elementum non quis ipsum. Nunc tristique nisi a elit venenatis viverra. Suspendisse pretium viverra
                    ante et interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit commodo
                    tincidunt. Fusce elit dui, vestibulum vitae consequat ut, convallis in justo. Proin quis lorem
                    volutpat, pretium erat sit amet, feugiat leo. Proin lacinia malesuada nisl, eget eleifend turpis.
                </p>
                <p>
                    Praesent ultrices non purus vitae blandit. Mauris venenatis pellentesque mi a rhoncus. Nullam in sem
                    ut nisi ornare tincidunt. Vivamus eu porttitor ex. Morbi quam sem, interdum vel ante in, blandit
                    condimentum arcu. Sed elit nunc, vehicula elementum lobortis nec, elementum eu metus. Pellentesque
                    non molestie est, quis venenatis est. Pellentesque consequat molestie risus quis aliquet. Maecenas
                    leo ante, bibendum sit amet magna vitae, malesuada blandit turpis. Aliquam arcu erat, hendrerit quis
                    ante et, dictum maximus mauris. Etiam consequat tellus eu ex condimentum maximus. Aliquam
                    ullamcorper non felis congue blandit.
                </p>
                <p>
                    Fusce lectus eros, rhoncus ac accumsan ut, pulvinar vitae quam. Quisque posuere leo urna, eu laoreet
                    ipsum feugiat ac. Maecenas cursus ultrices ultricies. Mauris magna turpis, pellentesque in tortor
                    sed,
                    iaculis semper massa. Sed tincidunt diam eu urna vestibulum, porttitor vestibulum lorem mattis.
                    Vestibulum bibendum nec est nec consequat. Etiam lacinia nulla vel nibh venenatis, quis ullamcorper
                    ligula condimentum. Maecenas dignissim, libero eget molestie mollis, nisl magna posuere turpis,
                    vitae
                    lacinia turpis quam eu tellus. In at urna in leo ultrices ultricies. Nunc dapibus purus eu
                    ullamcorper
                    ornare. Praesent ac faucibus velit.
                </p>
            </ModalDialog>
        </div>
        <div class="components__title">Dropdown</div>
        <div class="components__dropdowns">
            <Dropdown title="Dropdown top left" :options="dropdownOptions" position-top position-left />
            <Dropdown title="Dropdown bottom right" :options="dropdownOptions" />
        </div>
        <div class="components__title">Notices</div>
        <div>
            <button @click="errorNotice({ title: 'Error notice', message: 'Message notice' })" class="outline">
                Error notice
            </button>
            <button @click="successNotice({ title: 'Success notice', message: 'Message notice' })" class="outline">
                Success notice
            </button>
        </div>
        <div class="components__title">SidePanel</div>
        <div>
            <button @click="showPanel = !showPanel" class="outline">Show panel</button>

            <SidePanel button-style="outline" button-text="Show panel" v-model="showPanel">
                <ul>
                    <li v-for="i in 5" :key="i">Some text {{ i }}</li>
                </ul>
                <br>
                <router-link to="/">Router link</router-link>
                <br>
                <br>
                <button @click="successNotice({ title: 'Success notice', message: 'Message notice' })">Success notice
                </button>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean leo libero, vestibulum hendrerit
                    diam a, ultricies dapibus nisi. Nullam turpis metus, iaculis eget sapien mattis, convallis suscipit
                    est. Morbi diam urna, auctor nec dapibus id, tincidunt non odio. Cras a elementum est. Vestibulum
                    ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur facilisis
                    egestas lacus et lacinia. Sed vehicula dignissim ipsum at tincidunt. Etiam arcu elit, rutrum in
                    ultrices eget, interdum sed tellus. Proin turpis elit, ultricies ut mauris quis, mollis dictum
                    mauris. Suspendisse ornare non dolor et facilisis. In egestas dui non risus ultricies tempus.
                    Aliquam hendrerit augue lectus, ultricies fermentum ligula varius ut. Quisque sit amet hendrerit
                    dolor.
                </p>
                <p>
                    Pellentesque ut purus ultrices, dignissim leo eu, sodales tellus. Maecenas non massa eget massa
                    interdum sagittis. Morbi condimentum tempor enim, a sagittis urna rutrum eget. Aenean non tincidunt
                    augue. Suspendisse elementum euismod vulputate. Donec eros felis, accumsan vitae eleifend eget,
                    pharetra feugiat dui. Sed aliquet aliquam ipsum vel tincidunt. Nullam vel nibh congue, lobortis
                    lectus ac, vulputate arcu. Duis dui nunc, iaculis vitae nisi id, bibendum blandit mauris. Donec
                    vitae ullamcorper nunc, nec varius metus. Donec a dapibus magna. Vivamus ultricies, eros at aliquet
                    pulvinar, est mi efficitur est, sed porta arcu libero sit amet ligula. Mauris ac sagittis ex.
                </p>
                <p>
                    Morbi aliquam erat vel diam interdum dictum sit amet sit amet lorem. Phasellus blandit augue ut
                    libero placerat, vel imperdiet est luctus. Proin condimentum, libero eget sodales pulvinar, ligula
                    est interdum arcu, vitae pellentesque nunc nisi quis libero. Curabitur dapibus pharetra mi, id
                    euismod est fermentum in. Maecenas ornare leo velit, quis vestibulum neque iaculis eu. In in nunc
                    ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                    Pellentesque pharetra augue eu lectus egestas aliquam. Sed rutrum scelerisque mi sit amet ornare.
                    Vivamus quis tincidunt risus. Donec arcu sapien, consequat vitae commodo non, dictum eget nibh.
                </p>
                <p>
                    Fusce in fringilla neque, at dictum justo. Morbi vitae libero metus. In ut nunc ut lectus sagittis
                    elementum non quis ipsum. Nunc tristique nisi a elit venenatis viverra. Suspendisse pretium viverra
                    ante et interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit commodo
                    tincidunt. Fusce elit dui, vestibulum vitae consequat ut, convallis in justo. Proin quis lorem
                    volutpat, pretium erat sit amet, feugiat leo. Proin lacinia malesuada nisl, eget eleifend turpis.
                </p>
                <p>
                    Praesent ultrices non purus vitae blandit. Mauris venenatis pellentesque mi a rhoncus. Nullam in sem
                    ut nisi ornare tincidunt. Vivamus eu porttitor ex. Morbi quam sem, interdum vel ante in, blandit
                    condimentum arcu. Sed elit nunc, vehicula elementum lobortis nec, elementum eu metus. Pellentesque
                    non molestie est, quis venenatis est. Pellentesque consequat molestie risus quis aliquet. Maecenas
                    leo ante, bibendum sit amet magna vitae, malesuada blandit turpis. Aliquam arcu erat, hendrerit quis
                    ante et, dictum maximus mauris. Etiam consequat tellus eu ex condimentum maximus. Aliquam
                    ullamcorper non felis congue blandit.
                </p>
            </SidePanel>
        </div>
        <div class="components__title">Links</div>
        <div>
            <span v-for="i in 3" :key="i">
                <router-link to="/">link {{ i }}</router-link>
                <br>
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";
@import "../assets/styles/typography";

.components {
    margin: 24px auto 0;
    max-width: calc(#{$max-width} / 2);

    &__dropdowns {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        @extend .text-h2;

        margin-bottom: 16px;
        padding: 6px 0 12px;
        border-bottom: 1px solid $white;
        text-align: center;
        opacity: 0.8;
    }

    & > *:not(div.components__title) {
        margin-bottom: 48px;

        & > * {
            margin-bottom: 16px;
        }
    }
}
</style>
