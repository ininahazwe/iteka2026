import type { Schema, Struct } from '@strapi/strapi';

export interface InteractionInteraction extends Struct.ComponentSchema {
  collectionName: 'components_interaction_interactions';
  info: {
    displayName: 'Interaction';
  };
  attributes: {
    attachments: Schema.Attribute.Media<undefined, true>;
    date: Schema.Attribute.DateTime;
    notes: Schema.Attribute.Text;
    type: Schema.Attribute.Enumeration<
      ['call', 'meeting', 'email', 'encrypted', 'other']
    >;
  };
}

export interface MetaTag extends Struct.ComponentSchema {
  collectionName: 'components_meta_tag';
  info: {
    displayName: 'Tag';
    icon: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface StatsImpactStat extends Struct.ComponentSchema {
  collectionName: 'components_stats_impact_stats';
  info: {
    displayName: 'Impact Stat';
    icon: 'chartLine';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'interaction.interaction': InteractionInteraction;
      'meta.tag': MetaTag;
      'stats.impact-stat': StatsImpactStat;
    }
  }
}
