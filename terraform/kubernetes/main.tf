# build cluster
resource "oci_containerengine_cluster" "k8s_cluster" {
    compartment_id = var.tenancy_ocid
    kubernetes_version = "v1.25.4"
    name = "oci-k8s-cluster"
    vcn_id = var.vcn_id
}


# create a kubeconfig file for accessing the OKE cluster
data "oci_containerengine_cluster_kube_config" "k8s_auth" {
  cluster_id = oci_containerengine_cluster.k8s_cluster.id
}

# output the kubeconfig file path
output "kubeconfig_path" {
  value = pathexpand("~/.kube/config")
}

# write the kubeconfig file to disk
resource "local_file" "kubeconfig" {
  content = data.oci_containerengine_cluster_kube_config.k8s_auth.content
  filename = pathexpand("~/.kube/config")
}
