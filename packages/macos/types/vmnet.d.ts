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

declare class vmnet_network {
  constructor(init?: vmnet_network);
}

declare class vmnet_network_configuration {
  constructor(init?: vmnet_network_configuration);
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

declare function vmnet_network_configuration_create(mode: interop.Enum<typeof operating_modes_t>, status: interop.PointerConvertible): interop.Pointer;

declare function vmnet_network_create(configuration: interop.PointerConvertible, status: interop.PointerConvertible): interop.Pointer;

declare function vmnet_network_get_ipv4_subnet(network: interop.PointerConvertible, subnet: interop.PointerConvertible, mask: interop.PointerConvertible): void;

declare function vmnet_network_get_ipv6_prefix(network: interop.PointerConvertible, prefix: interop.PointerConvertible, prefix_len: interop.PointerConvertible): void;

declare function vmnet_network_copy_serialization(network: interop.PointerConvertible, status: interop.PointerConvertible): NSObject;

declare function vmnet_network_create_with_serialization(network: NSObject, status: interop.PointerConvertible): interop.Pointer;

declare function vmnet_interface_start_with_network(network: interop.PointerConvertible, interface_desc: NSObject, queue: NSObject, start_block: (p1: interop.Enum<typeof vmnet_return_t>, p2: NSObject) => void): interop.Pointer;

declare function vmnet_network_configuration_set_external_interface(config: interop.PointerConvertible, interface_name: string): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_network_configuration_disable_nat44(config: interop.PointerConvertible): void;

declare function vmnet_network_configuration_disable_nat66(config: interop.PointerConvertible): void;

declare function vmnet_network_configuration_disable_dhcp(config: interop.PointerConvertible): void;

declare function vmnet_network_configuration_disable_dns_proxy(config: interop.PointerConvertible): void;

declare function vmnet_network_configuration_disable_router_advertisement(config: interop.PointerConvertible): void;

declare function vmnet_network_configuration_set_ipv4_subnet(config: interop.PointerConvertible, subnet_addr: interop.PointerConvertible, subnet_mask: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_network_configuration_set_ipv6_prefix(config: interop.PointerConvertible, prefix: interop.PointerConvertible, len: number): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_network_configuration_add_port_forwarding_rule(config: interop.PointerConvertible, protocol: number, address_family: number, internal_port: number, external_port: number, internal_address: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_network_configuration_add_dhcp_reservation(config: interop.PointerConvertible, client: interop.PointerConvertible, reservation: interop.PointerConvertible): interop.Enum<typeof vmnet_return_t>;

declare function vmnet_network_configuration_set_mtu(config: interop.PointerConvertible, mtu: number): interop.Enum<typeof vmnet_return_t>;

