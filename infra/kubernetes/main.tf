resource "oci_containerengine_cluster" "k8s_cluster" {
    
    compartment_id = var.tenancy_ocid
    kubernetes_version = "v1.25.4"
    name = "oci-k8s-cluster"
    vcn_id = var.vcn_id
}