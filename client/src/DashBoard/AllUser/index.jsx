function AllUser() {
  return (
    <div className="w-full">
      <table class="w-full border-collapse border border-slate-500 ...">
        <thead>
          <tr>
            <th class="border border-slate-600 ...">id</th>
            <th class="border border-slate-600 ...">email</th>
            <th class="border border-slate-600 ...">phone</th>
            <th class="border border-slate-600 ...">address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-700 ...">Indiana</td>
            <td class="border border-slate-700 ...">Indianapolis</td>
            <td class="border border-slate-700 ...">Indiana</td>
            <td class="border border-slate-700 ...">Indianapolis</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AllUser;
