"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string | null;
  price: number;
  quota: number;
  created_at: string;
}

const emptyForm = {
  title: "",
  description: "",
  location: "",
  event_date: "",
  price: 0,
  quota: 0,
};

export default function EventsPage() {
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setEvents(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
    setError(null);
  }

  function openEdit(event: Event) {
    setEditingId(event.id);
    setForm({
      title: event.title,
      description: event.description || "",
      location: event.location || "",
      event_date: event.event_date ? event.event_date.slice(0, 16) : "",
      price: event.price,
      quota: event.quota,
    });
    setShowForm(true);
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      description: form.description || null,
      location: form.location || null,
      event_date: form.event_date || null,
      price: Number(form.price),
      quota: Number(form.quota),
    };

    if (editingId) {
      const { error } = await supabase
        .from("events")
        .update(payload)
        .eq("id", editingId);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.from("events").insert(payload);
      if (error) setError(error.message);
    }

    setSaving(false);
    if (!error) {
      setShowForm(false);
      fetchEvents();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus event ini?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      fetchEvents();
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Kelola Event
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Tambah, edit, dan hapus event
          </p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-semibold transition flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Event
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-6">
              {editingId ? "Edit Event" : "Tambah Event Baru"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nama Event *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Nama event..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
                  placeholder="Deskripsi event..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                    placeholder="Lokasi..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Tanggal & Waktu
                  </label>
                  <input
                    type="datetime-local"
                    value={form.event_date}
                    onChange={(e) =>
                      setForm({ ...form, event_date: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Kuota
                  </label>
                  <input
                    type="number"
                    value={form.quota}
                    onChange={(e) =>
                      setForm({ ...form, quota: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                    min={0}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 transition"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold transition"
              >
                {saving
                  ? "Menyimpan..."
                  : editingId
                    ? "Simpan Perubahan"
                    : "Tambah Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <div className="inline-block w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-3" />
          <p className="text-sm">Memuat data...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            Belum ada event. Klik &quot;Tambah Event&quot; untuk mulai.
          </p>
        </div>
      ) : (
        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">
                    Event
                  </th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium hidden md:table-cell">
                    Lokasi
                  </th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium hidden lg:table-cell">
                    Tanggal
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">
                    Harga
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">
                    Kuota
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{event.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {event.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden md:table-cell">
                      {event.location || "—"}
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden lg:table-cell">
                      {formatDate(event.event_date)}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                      {formatPrice(event.price)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-400">
                      {event.quota}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(event)}
                          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-blue-400 transition"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-red-400 transition"
                          title="Hapus"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
