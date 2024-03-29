import { createI18n } from 'vue-i18n'

const TRANSLATIONS = {
  en: {
    accounts: {
      amount: 'Amount',
      balance: 'Balance',
      color: 'Color',
      currency: 'Currency',
      currency_support: 'Enable exchange rates',
      exchange_rate: 'Exchange rate',
      from_account: 'From account',
      include_balance: 'Include in balance?',
      name: 'Name',
      new_account: 'Add account',
      plural: 'Accounts',
      singular: 'Account',
      title: 'Account',
      to_account: 'To account',
      transfer: 'Transfer',
    },

    actions: {
      add: 'Add',
      close: 'Close',
      confirm: 'Are you sure?',
      edit: 'Edit',
      delete: 'Delete',
      filter: 'Filter',
      no_turning_back: "There's no turning back.",
      reset: 'Reset',
      save: 'Save',
      submit: 'Submit',
      transfer: 'Transfer',
      update: 'Update',
    },

    balance_summary: {
      balance: 'Balance',
      color: 'Color',
      edit_goal: 'Edit goal',
      expenses: 'Expenses',
      goal: 'Goal',
      month: 'Month',
      name: 'Name',
      week: 'Week',
    },

    categories: {
      title: 'Categories',
      new_category: 'Add category',
      categories: 'Categories',
      category: 'Category',
      change_color: 'Change color',
      color: 'Color',
      delete_category_notice: 'This will delete all of the related subcategories.',
      icon: 'Icon (emoji)',
      new_subcategory: 'Add subcategory',
      pick_emoji: 'Pick an emoji',
      subcategories: 'Subcategories',
      subcategory: 'Subcategory',
    },

    charts: {
      cumulative: 'Cumulative?',
      money: 'Money',
      month: 'Month',
      monthly: 'Monthly',
      summary: '{periodicity} summary',
      week: 'Week',
      weekly: 'Weekly',
    },

    color_picker: {
      change_color: 'Change color',
      current_color: 'Current color',
      pick_color: 'Pick a color',
    },

    confirm: 'Are you sure?',

    data: {
      destroy: {
        action: 'Destroy',
        description: `Destroy <strong>all</strong> local data &mdash; export first if unsure`,
        title: 'Destroy',
      },
      export: {
        accounts: 'Accounts',
        as: 'As',
        expenses: 'Expenses',
        description: 'Some mobile browsers will not let you download <code>.json</code> files for security reasons.',
        summary: `If you're having trouble exporting as <code>.json</code>, export the data as a <code>.txt</code> file, it will still be in JSON format, just diferent extension.`,
        title: 'Export',
      },
      import: {
        action: 'Upload',
        description: 'Select an exported file',
        title: 'Import',
      },
      seed: {
        action: 'Seed',
        description: 'Seed test data to see how the app works',
        title: 'Seed',
      },
      title: 'Data',
    },

    debug: {
      debug_messages: 'Debug messages',
    },

    expenses: {
      account: 'Account',
      add: 'Add expense',
      amount: 'Amount',
      category: 'Category',
      date: 'Date',
      description: 'Notes',
      no_expenses: 'Move along, nothing to show here. Try changing the filters!',
      show_more: 'Show more',
      subcategory: 'Subcategory',
    },

    filters: {
      account: 'Account',
      at_least: 'At least (>=)',
      category: 'Category',
      comparator: 'Price comparator',
      end_date: 'End date',
      price: 'Price',
      start_date: 'Start date',
      title: 'Filters',
      up_to: 'Up to (<=)',
    },

    footer: {
      by: 'By',
    },

    navbar: {
      about: 'About',
      categories: 'Categories',
      data: 'Data',
      home: 'Home',
      settings: 'Settings',
    },

    settings: {
      language: 'Language',
      compact: 'Compact',
    },

    income: 'Income',
    outcome: 'Outcome',

    total: 'Total',
  },

  es: {
    accounts: {
      amount: 'Cantidad',
      balance: 'Balance',
      color: 'Color',
      currency: 'Moneda',
      currency_support: 'Habilitar tipo de cambio',
      exchange_rate: 'Tipo de cambio',
      from_account: 'De cuenta',
      include_balance: 'Incluir en balance?',
      name: 'Nombre',
      new_account: 'Agregar cuenta',
      plural: 'Cuentas',
      singular: 'Cuenta',
      title: 'Cuenta',
      to_account: 'Hacia cuenta',
      transfer: 'Transferir',
    },

    actions: {
      add: 'Agregar',
      close: 'Cerrar',
      confirm: '¿Estás seguro?',
      edit: 'Editar',
      delete: 'Borrar',
      filter: 'Filtrar',
      no_turning_back: 'No hay vuelta atras.',
      reset: 'Limpiar',
      save: 'Guardar',
      submit: 'Enviar',
      transfer: 'Transferir',
      update: 'Actualizar',
    },

    balance_summary: {
      balance: 'Balance',
      color: 'Color',
      edit_goal: 'Editar meta',
      expenses: 'Gastos',
      goal: 'Meta',
      month: 'Mes',
      name: 'Nombre',
      week: 'Semana',
    },

    categories: {
      title: 'Categorias',
      new_category: 'Agregar categoria',
      categories: 'Categorias',
      category: 'Categoria',
      change_color: 'Cambiar color',
      delete_category_notice: 'Esto borrará todas las subcategorias relacionadas.',
      icon: 'Ícono (emoji)',
      new_subcategory: 'Agregar subcategoria',
      pick_emoji: 'Escoge un emoji',
      subcategories: 'Subcategorias',
      subcategory: 'Subcategoria',
    },

    charts: {
      cumulative: 'Cumulativo?',
      money: 'Dinero',
      month: 'Mes',
      monthly: 'Mensual',
      summary: 'Resumen {periodicity}',
      week: 'Semana',
      weekly: 'Semanal',
    },

    color_picker: {
      change_color: 'Cambiar color',
      current_color: 'Color actual',
      pick_color: 'Escoge un color',
    },

    confirm: '¿Estás seguro?',

    data: {
      destroy: {
        action: 'Borrar',
        description: `Borrar <strong>toda</strong> la información local &mdash; exporta primero si no estas seguro`,
        title: 'Borrar',
      },
      export: {
        accounts: 'Cuentas',
        as: 'Como',
        expenses: 'Gastos',
        description: 'Algunos navegadores no permiten descargar archivos <code>.json</code> por seguridad.',
        summary: `Si tienes problemas exportando como <code>.json</code>, exporta los datos como archivo <code>.txt</code>, seguirá siendo formato JSON, pero con diferente extensión.`,
        title: 'Exportar',
      },
      import: {
        action: 'Subir',
        description: 'Selecciona un archivo a importar',
        title: 'Importar',
      },
      seed: {
        action: 'Generar',
        description: 'Genera datos de prueba para ver como funciona la app',
        title: 'Datos de prueba',
      },
      title: 'Datos',
    },

    debug: {
      debug_messages: 'Mensajes de depuración',
    },

    expenses: {
      account: 'Cuenta',
      add: 'Registrar gasto',
      amount: 'Cantidad',
      category: 'Categoria',
      date: 'Fecha',
      description: 'Notas',
      no_expenses: 'Move along, nothing to show here. Try changing the filters!',
      show_more: 'Mostrar mas',
      subcategory: 'Subcategoria',
    },

    filters: {
      account: 'Cuenta',
      at_least: 'Al menos (>=)',
      category: 'Categoria',
      comparator: 'Comparador de precio',
      end_date: 'Fecha final',
      price: 'Precio',
      start_date: 'Fecha inicio',
      title: 'Filtros',
      up_to: 'Hasta (<=)',
    },

    footer: {
      by: 'Por',
    },

    navbar: {
      about: 'Acerca de',
      categories: 'Categorias',
      data: 'Datos',
      home: 'Inicio',
      settings: 'Configuración',
    },

    settings: {
      language: 'Idioma',
      compact: 'Compacto',
    },

    income: 'Ingresos',
    outcome: 'Egresos',

    total: 'Total',
  },
}

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: TRANSLATIONS,
})

export default i18n

export {
  TRANSLATIONS,
  i18n,
}
