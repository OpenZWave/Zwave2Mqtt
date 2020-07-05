// Place here repeated patterns

const FAN_DIMMER = {
  type: 'fan',
  object_id: 'dimmer',
  values: ['38-1-0'],
  discovery_payload: {
    command_topic: '38-1-0',
    speed_command_topic: '38-1-0',
    speed_state_topic: '38-1-0',
    state_topic: '38-1-0',
    speeds: ['off', 'low', 'medium', 'high'],
    payload_low_speed: 24,
    payload_medium_speed: 50,
    payload_high_speed: 99,
    payload_off: 0,
    payload_on: 255,
    state_value_template:
      '{% if (value_json.value | int) == 0 %} 0 {% else %} 255 {% endif %}',
    speed_value_template:
      '{% if (value_json.value | int) == 0 %} 0 {% elif (value_json.value | int) <= 32 %} 24 {% elif (value_json.value | int) <= 66 %} 50 {% elif (value_json.value | int) <= 99 %} 99 {% endif %}'
  }
}

// Radio Thermostat / 2GIG CT32 and CT101
const THERMOSTAT_2GIG = {
  type: 'climate',
  object_id: 'thermostat',
  values: ['49-1-1', '64-1-0', '66-1-0', '67-1-1', '67-1-2', '68-1-0'],
  mode_map: {
    off: 'Off',
    heat: 'Heat',
    cool: 'Cool'
  },
  fan_mode_map: {
    auto: 'Auto Low',
    on: 'On Low'
  },
  setpoint_topic: {
    Heat: '67-1-1',
    Cool: '67-1-2'
  },
  default_setpoint: '67-1-1',
  discovery_payload: {
    min_temp: 50,
    max_temp: 85,
    modes: ['off', 'heat', 'cool'],
    fan_modes: ['auto', 'on'],
    action_topic: '66-1-0',
    action_template: '{{ value_json.value | lower }}',
    current_temperature_topic: '49-1-1',
    current_temperature_template: '{{ value_json.value }}',
    fan_mode_state_topic: '68-1-0',
    fan_mode_command_topic: true,
    mode_state_topic: '64-1-0',
    mode_command_topic: true,
    temperature_state_template: '{{ value_json.value }}',
    temperature_command_topic: true
  }
}

// Eurotronic Spirit Z-Wave Plus Thermostat
const SPIRIT_ZWAVE_PLUS = {
  type: 'climate',
  object_id: 'thermostat',
  values: ['64-1-0', '49-1-1', '67-1-1', '67-1-11'],
  mode_map: { off: 'Off', heat: 'Heat', cool: 'Heat Eco' },
  setpoint_topic: { Heat: '67-1-1', 'Heat Eco': '67-1-11' },
  default_setpoint: '67-1-1',
  discovery_payload: {
    min_temp: 8,
    max_temp: 28,
    modes: ['off', 'heat', 'cool'],
    mode_state_topic: '64-1-0',
    mode_command_topic: true,
    current_temperature_topic: '49-1-1',
    temp_step: 0.5,
    current_temperature_template: '{{ value_json.value }}',
    temperature_state_template: '{{ value_json.value }}',
    temperature_command_topic: true
  }
}

const DANFOSS_TRV_ZWAVE = {
  type: 'climate',
  object_id: 'thermostat',
  values: ['49-1-1', '67-1-1'],
  setpoint_topic: { Heat: '67-1-1' },
  default_setpoint: '67-1-1',
  discovery_payload: {
    min_temp: 4,
    max_temp: 28,
    mode_command_topic: false,
    temp_step: 0.5,
    current_temperature_topic: '49-1-1',
    current_temperature_template: '{{ value_json.value }}',
    temperature_state_template: '{{ value_json.value }}',
    temperature_command_topic: true
  }
}

const COVER = {
  type: 'cover',
  object_id: 'position',
  values: ['38-1-0'],
  discovery_payload: {
    command_topic: '38-1-0',
    position_topic: '38-1-0',
    set_position_topic: '38-1-0',
    value_template: '{{ (value_json.value / 99 * 100) | round(0) }}',
    position_open: 99,
    position_closed: 0,
    payload_open: '99',
    payload_close: '0'
  }
}

module.exports = {
  '89-3-1': [
    {
      type: 'climate',
      object_id: 'HRT4-ZW',
      values: ['49-1-1', '67-1-1'],
      mode_map: {
        off: 'Off',
        heat: 'Heating'
      },
      setpoint_topic: { Heat: '67-1-1' },
      default_setpoint: '67-1-1',
      discovery_payload: {
        min_temp: 5,
        max_temp: 30,
        modes: ['off', 'heat'],
        current_temperature_topic: '49-1-1',
        current_temperature_template: '{{ value_json.value }}',
        temperature_state_template: '{{ value_json.value }}',
        temperature_command_topic: true
      }
    }
  ],
  '411-1-1': [
    // Heatit Thermostat TF 021 (ThermoFloor AS)
    {
      type: 'climate',
      object_id: 'thermostat',
      values: ['64-1-0', '49-1-1', '67-1-1', '67-1-2'],
      mode_map: { off: 'Off', heat: 'Heat (Default)', cool: 'Cool' },
      setpoint_topic: { 'Heat (Default)': '67-1-1', Cool: '67-1-2' },
      default_setpoint: '67-1-1',
      discovery_payload: {
        min_temp: 15,
        max_temp: 30,
        modes: ['off', 'heat', 'cool'],
        mode_state_topic: '64-1-0',
        mode_command_topic: true,
        current_temperature_topic: '49-1-1',
        current_temperature_template: '{{ value_json.value }}',
        temperature_state_template: '{{ value_json.value }}',
        temperature_command_topic: true
      }
    }
  ],
  '411-514-3': [
    // Heatit Thermostat TF 056 (ThermoFloor AS)
    {
      type: 'climate',
      object_id: 'thermostat',
      values: ['64-1-0', '49-1-1', '67-1-1', '67-1-2'],
      mode_map: { off: 'Off', heat: 'Heat', cool: 'Cool' },
      setpoint_topic: { Heat: '67-1-1', Cool: '67-1-2' },
      default_setpoint: '67-1-1',
      discovery_payload: {
        min_temp: 15,
        max_temp: 30,
        modes: ['off', 'heat', 'cool'],
        mode_state_topic: '64-1-0',
        mode_command_topic: true,
        current_temperature_topic: '49-1-1',
        current_temperature_template: '{{ value_json.value }}',
        temperature_state_template: '{{ value_json.value }}',
        temperature_command_topic: true
      }
    }
  ],
  '798-1-5': [
    // Inovelli LZW42 Multi-Color Bulb
    {
      type: 'light',
      object_id: 'rgbw_bulb',
      values: ['38-1-0', '51-1-0'],
      discovery_payload: {
        state_topic: '38-1-0',
        command_topic: '38-1-0',
        on_command_type: 'brightness',
        brightness_state_topic: '38-1-0',
        brightness_command_topic: '38-1-0',
        state_value_template: '{{ "OFF" if value_json.value == 0 else "ON" }}',
        brightness_value_template: '{{ (value_json.value) | round(0) }}',
        brightness_scale: '99',
        color_temp_state_topic: '51-1-0',
        color_temp_command_template:
          "{{ '#%02x%02x%02x%02x%02x' | format(0, 0, 0, (0.7349 * (value - 153)) | round(0), 255 - (0.7349 * (value - 153)) | round(0))}}",
        color_temp_command_topic: '51-1-0',
        color_temp_value_template:
          '{{ (((value_json.value[7:9] | int(0, 16)) / 0.7349 ) | round(0)) + 153 }}',
        rgb_command_template:
          "{{'#%02x%02x%02x%02x%02x' | format(red, green, blue,0,0)}}",
        rgb_command_topic: '51-1-0',
        rgb_state_topic: '51-1-0',
        rgb_value_template:
          '{{ value_json.value[1:3] | int(0, 16) }},{{ value_json.value[3:5] | int(0, 16) }},{{ value_json.value[5:7] | int(0, 16) }}'
      }
    }
  ],
  '5-1619-20549': [
    // Intermatic PE653 MultiWave Receiver
    {
      type: 'climate',
      object_id: 'pool_thermostat',
      values: ['49-1-1', '67-1-1'],
      default_setpoint: '67-1-1',
      discovery_payload: {
        min_temp: 40,
        max_temp: 104,
        modes: ['heat'],
        temperature_unit: 'F',
        current_temperature_topic: '49-1-1',
        current_temperature_template: '{{ value_json.value }}',
        temperature_command_topic: true,
        temperature_state_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'climate',
      object_id: 'spa_thermostat',
      values: ['49-1-1', '67-1-7'],
      default_setpoint: '67-1-7',
      discovery_payload: {
        min_temp: 40,
        max_temp: 104,
        modes: ['heat'],
        temperature_unit: 'F',
        current_temperature_topic: '49-1-1',
        current_temperature_template: '{{ value_json.value }}',
        temperature_command_topic: true,
        temperature_state_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'switch',
      object_id: 'circuit_1',
      values: ['37-1-0'],
      discovery_payload: {
        payload_off: false,
        payload_on: true,
        state_topic: '37-1-0',
        command_topic: '37-1-0',
        value_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'switch',
      object_id: 'circuit_2',
      values: ['37-2-0'],
      discovery_payload: {
        payload_off: false,
        payload_on: true,
        state_topic: '37-2-0',
        command_topic: '37-2-0',
        value_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'switch',
      object_id: 'circuit_3',
      values: ['37-3-0'],
      discovery_payload: {
        payload_off: false,
        payload_on: true,
        state_topic: '37-3-0',
        command_topic: '37-3-0',
        value_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'switch',
      object_id: 'circuit_4',
      values: ['37-4-0'],
      discovery_payload: {
        payload_off: false,
        payload_on: true,
        state_topic: '37-4-0',
        command_topic: '37-4-0',
        value_template: '{{ value_json.value }}'
      }
    },
    {
      type: 'switch',
      object_id: 'circuit_5',
      values: ['37-5-0'],
      discovery_payload: {
        payload_off: false,
        payload_on: true,
        state_topic: '37-5-0',
        command_topic: '37-5-0',
        value_template: '{{ value_json.value }}'
      }
    }
  ],
  '2-4-5': [DANFOSS_TRV_ZWAVE], // DanfossZ
  '2-373-5': [DANFOSS_TRV_ZWAVE], // Danfoss LC-13
  '2-40976-266': [DANFOSS_TRV_ZWAVE], // Popp Radiator Thermostat
  '57-12593-18756': [FAN_DIMMER], // Honeywell 39358 In-Wall Fan Control
  '99-12340-18756': [FAN_DIMMER], // GE 1724 Dimmer
  '99-12593-18756': [FAN_DIMMER], // GE 1724 Dimmer
  '152-12-25857': [THERMOSTAT_2GIG], // Radio Thermostat / 2GIG CT101
  '152-256-8194': [THERMOSTAT_2GIG], // Radio Thermostat / 2GIG CT32
  '271-4096-770': [COVER], // Fibaro FGS222
  '328-1-3': [SPIRIT_ZWAVE_PLUS],
  '328-2-3': [SPIRIT_ZWAVE_PLUS],
  '328-3-3': [SPIRIT_ZWAVE_PLUS],
  '345-82-3': [COVER], // Qubin0 flush shutter
  '622-23089-17235': [COVER] // Graber/Bali/Spring Fashion Covers
}
