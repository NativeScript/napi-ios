/// <reference types="@nativescript/objc-node-api" />

declare const vmnet_write_max_packets_key: string;

declare const vmnet_enable_checksum_offload_key: string;

declare const vmnet_enable_isolation_key: string;

declare const vmnet_host_ipv6_address_key: string;

declare const vmnet_host_subnet_mask_key: string;

declare const vmnet_end_address_key: string;

declare const vmnet_start_address_key: string;

declare const vmnet_interface_id_key: string;

declare const vmnet_max_packet_size_key: string;

declare const vmnet_mtu_key: string;

declare const vmnet_allocate_mac_address_key: string;

declare const vmnet_shared_interface_name_key: string;

declare const vmnet_enable_virtio_header_key: string;

declare const vmnet_nat66_prefix_key: string;

declare const vmnet_enable_tso_key: string;

declare const vmnet_network_identifier_key: string;

declare const vmnet_read_max_packets_key: string;

declare const vmnet_subnet_mask_key: string;

declare const vmnet_nat66_prefix_length_key: string;

declare const vmnet_mac_address_key: string;

declare const vmnet_host_ip_address_key: string;

declare const vmnet_operation_mode_key: string;

declare const vmnet_estimated_packets_available_key: string;

declare const vmnet_return_t: {
  SUCCESS: 1000,
  FAILURE: 1001,
  MEM_FAILURE: 1002,
  INVALID_ARGUMENT: 1003,
  SETUP_INCOMPLETE: 1004,
  INVALID_ACCESS: 1005,
  PACKET_TOO_BIG: 1006,
  BUFFER_EXHAUSTED: 1007,
  TOO_MANY_PACKETS: 1008,
  SHARING_SERVICE_BUSY: 1009,
  NOT_AUTHORIZED: 1010,
};

declare const operating_modes_t: {
  HOST_: 1000,
  SHARED_: 1001,
  BRIDGED_: 1002,
};

declare const interface_event_t: {
  VMNET_INTERFACE_PACKETS_AVAILABLE: 1,
};

declare class vmnet_interface {
  constructor(init?: vmnet_interface);
}

declare class vmpktdesc {
  constructor(init?: vmpktdesc);
  vm_pkt_size: number;
  vm_pkt_iov: interop.Pointer;
  vm_pkt_iovcnt: number;
  vm_flags: number;
}

declare function vmnet_start_interface(interface_desc: NSObject, queue: NSObject, handler: (p1: interop.Enum<typeof vmnet_return_t>, p2: NSObject) => void): interop.Pointer;

declare function vmnet_interface_set_event_callback(interface: interop.PointerConvertible, event_mask: interop.Enum<typeof interface_event_t>, queue: NSObject, callback: (p1: interop.Enum<typeof interface_event_t>, p2: NSObject) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_write(interface: interop.PointerConvertible, packets: interop.PointerConvertible, pktcnt: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_read(interface: interop.PointerConvertible, packets: interop.PointerConvertible, pktcnt: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_stop_interface(interface: interop.PointerConvertible, queue: NSObject, handler: (p1: interop.Enum<typeof vmnet_return_t>) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_add_port_forwarding_rule(interface: interop.PointerConvertible, protocol: number, external_port: number, internal_address: in_addr, internal_port: number, handler: (p1: interop.Enum<typeof vmnet_return_t>) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_remove_port_forwarding_rule(interface: interop.PointerConvertible, protocol: number, external_port: number, handler: (p1: interop.Enum<typeof vmnet_return_t>) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_port_forwarding_rule_get_details(rule: NSObject, protocol: interop.PointerConvertible, external_port: interop.PointerConvertible, internal_address: interop.PointerConvertible, internal_port: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_get_port_forwarding_rules(interface: interop.PointerConvertible, handler: (p1: NSObject) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_add_ip_port_forwarding_rule(interface: interop.PointerConvertible, protocol: number, external_port: number, address_family: number, internal_address: interop.PointerConvertible, internal_port: number, handler: (p1: interop.Enum<typeof vmnet_return_t>) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_remove_ip_port_forwarding_rule(interface: interop.PointerConvertible, protocol: number, external_port: number, address_family: number, handler: (p1: interop.Enum<typeof vmnet_return_t>) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_ip_port_forwarding_rule_get_details(rule: NSObject, protocol: interop.PointerConvertible, external_port: interop.PointerConvertible, address_family: number, internal_address: interop.PointerConvertible, internal_port: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_interface_get_ip_port_forwarding_rules(interface: interop.PointerConvertible, address_family: number, handler: (p1: NSObject) => void): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_copy_shared_interface_list(): NSObject;

