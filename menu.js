window.addEventListener('load', function() {
    // Kita beri waktu 5 detik agar semua layer (termasuk Esri) selesai dimuat
    setTimeout(function() {
        var m = window.map || window.olMap;
        if (!m) return;
        var list = document.getElementById('layer-list');
        if (!list) return;
        
        list.innerHTML = ''; 
        
        m.getLayers().forEach(function(layer) {
            // Deteksi apakah layer ini Esri
            var isEsri = (layer instanceof ol.layer.Tile && layer.get('title') === 'Satelit (Esri)');
            
            if (layer instanceof ol.layer.Vector || isEsri) {
                var nama = layer.get('title') || layer.get('name') || "";
                var temp = document.createElement("div");
                temp.innerHTML = nama;
                var teks = temp.textContent || temp.innerText || "";
                
                var lowerTeks = teks.toLowerCase();
                // Buang "layer peta", "basemap", "tanpa nama", dan teks kosong
                if (lowerTeks.includes('layer peta') || lowerTeks.includes('basemap') || lowerTeks.includes('tanpa nama') || teks.trim() === "") {
                    return;
                }

                var label = document.createElement('label');
                label.style.display = 'block';
                var cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = layer.getVisible();
                cb.onchange = function() { layer.setVisible(this.checked); };
                label.appendChild(cb);
                label.appendChild(document.createTextNode(" " + teks));
                list.appendChild(label);
            }
        });
    }, 5000); // 5000 milidetik = 5 detik
});
