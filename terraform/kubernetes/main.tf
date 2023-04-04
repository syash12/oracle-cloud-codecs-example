# build cluster
resource "oci_containerengine_cluster" "k8s_cluster" {
    compartment_id = var.tenancy_ocid
    kubernetes_version = "v1.25.4"
    name = "oci-k8s-cluster"
    vcn_id = var.vcn_id

    # node_pools {
    # name = "worker-pool"
    # node_shape = "VM.Standard2.1"
    # node_image_name = "Oracle-Linux-7.8"
    # quantity_per_subnet = 1
    # }

    # cluster_pod_network_options {
    #     cni_type = "OCI_VCN_IP_NATIVE"
    # }
}


# get kubeconfig data for authenticating to cluster
data "oci_containerengine_cluster_kube_config" "k8s_auth" {
  cluster_id = oci_containerengine_cluster.k8s_cluster.id
}

# write the kubeconfig file to disk
resource "local_file" "kubeconfig" {
  content = data.oci_containerengine_cluster_kube_config.k8s_auth.content
  filename = pathexpand("~/.kube/config")
}
