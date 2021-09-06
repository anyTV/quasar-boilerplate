<template>
    <q-page class="flex flex-center row q-pa-md q-gutter-md ">
        <div class="col-12">
            <q-card>
                <q-card-section>
                    <h5 v-text="$trans('translation_demo')" /> <br/>
                    <span v-text="'hello_name: hello {{ name }}'" /><br/>
                    <span v-text="`$trans(${JSON.stringify(hello_with_name)}) = `" />
                    <span v-text="$trans(hello_with_name)" />
                </q-card-section>
            </q-card>
        </div>
        <div class="col-12">
            <q-card>
                <q-card-section>
                    <h5 v-text="$trans('axios_demo')" /> <br/>

                    <q-input
                        v-model="post_id"
                        label="post_id"
                        class="q-mb-xs"
                    />
                    <q-btn
                        color="primary"
                        :label="$trans('submit')"
                        @click="update_post"
                    />
                </q-card-section>
                <q-card-section>
                    <span v-text="text" />
                </q-card-section>
            </q-card>
        </div>
        <div class="col-12">
            <q-card>
                <q-card-section>
                    <h5 v-text="$trans('notification_demo')" /> <br/>
                    <q-btn
                        class="q-mr-xs"
                        :label="$trans('success')"
                        color="green"
                        @click="notify_success"
                    />
                    <q-btn
                        :label="$trans('error')"
                        color="red"
                        @click="notify_error"
                    />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    name: 'Demo',

    setup() {
        return {
            hello_with_name: {
                key: 'hello_name',
                data: {name: 'John Doe' }
            },
            text: ref('Update post_id (1,2,3) and click submit'),
            post_id: ref(null),
        };
    },

    methods: {
        async update_post() {
            try {
                const response = await this.$axios.get(`/posts/${this.post_id}`);
                this.text = response.data.body;

                this.$notify.success(`Axioss Success!`);
            }
            catch (error) {
                this.$notify.error('Axioss Failed');
            }
        },

        notify_success() {
            this.$notify.success('notification_demo');
        },

        notify_error() {
            this.$notify.error('notification_demo');
        },
    },
});
</script>
