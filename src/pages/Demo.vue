<template>
    <q-page class="flex flex-center row q-pa-md q-gutter-md ">
        <q-card class="col-12">
            <q-card-section>
                <h5 v-text="$trans('f_table_demo')" /> <br>
                <f-table 
                    :rows="rows"
                    :columns="columns"
                />
            </q-card-section>
        </q-card>
        <q-card class="col-12">
            <q-card-section>
                <h5 v-text="$trans('translation_demo')" /> <br>
                <span v-text="'hello_name: hello {{ name }}'" /><br>
                <span v-text="`$trans(${JSON.stringify(hello_with_name)}) = `" />
                <span v-text="$trans(hello_with_name)" />
            </q-card-section>
        </q-card>
        <q-card class="col-12">
            <q-card-section>
                <h5 v-text="$trans('axios_demo')" /> <br>
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
        <q-card class="col-12">
            <q-card-section>
                <h5 v-text="$trans('notification_demo')" /> <br>
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
    </q-page>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    const columns = [
        {
            name: 'name',
            required: true,
            label: 'Dessert (100g serving)',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ];

    const rows = [
        {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
        },
        {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
        },
        {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%',
            iron: '7%'
        },
        {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%',
            iron: '8%'
        },
        {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%',
            iron: '16%'
        },
        {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%',
            iron: '0%'
        },
        {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%',
            iron: '2%'
        },
        {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%',
            iron: '45%'
        },
        {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%',
            iron: '22%'
        },
        {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%',
            iron: '6%'
        }
    ];

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
                columns,
                rows
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
